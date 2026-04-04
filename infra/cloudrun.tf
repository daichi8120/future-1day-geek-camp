# Cloud Run — コンテナ実行環境

locals {
  image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.service_name}/app:latest"
}

# Cloud Run が Secret Manager を読めるようにするサービスアカウント
data "google_project" "current" {}

resource "google_secret_manager_secret_iam_member" "cloudrun_database_url" {
  secret_id = google_secret_manager_secret.database_url.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${data.google_project.current.number}-compute@developer.gserviceaccount.com"
}

resource "google_secret_manager_secret_iam_member" "cloudrun_better_auth_secret" {
  secret_id = google_secret_manager_secret.better_auth_secret.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${data.google_project.current.number}-compute@developer.gserviceaccount.com"
}

# Cloud Run サービス
resource "google_cloud_run_v2_service" "app" {
  name                = "${var.service_name}-app"
  location            = var.region
  deletion_protection = false

  template {
    containers {
      image = local.image

      ports {
        container_port = 3000
      }

      resources {
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
      }

      # Secret Manager から環境変数を注入
      env {
        name = "DATABASE_URL"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.database_url.secret_id
            version = "latest"
          }
        }
      }

      env {
        name = "BETTER_AUTH_SECRET"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.better_auth_secret.secret_id
            version = "latest"
          }
        }
      }

      env {
        name  = "BETTER_AUTH_URL"
        value = var.cloud_run_url
      }

      env {
        name  = "NEXT_PUBLIC_BETTER_AUTH_URL"
        value = var.cloud_run_url
      }
    }

    scaling {
      min_instance_count = 0
      max_instance_count = 2
    }
  }

  depends_on = [
    google_project_service.apis,
    google_secret_manager_secret_iam_member.cloudrun_database_url,
    google_secret_manager_secret_iam_member.cloudrun_better_auth_secret,
  ]
}

# 未認証アクセスを許可（公開 Web アプリのため）
resource "google_cloud_run_v2_service_iam_member" "public" {
  name     = google_cloud_run_v2_service.app.name
  location = var.region
  role     = "roles/run.invoker"
  member   = "allUsers"
}
