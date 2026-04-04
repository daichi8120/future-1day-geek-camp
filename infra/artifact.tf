# Artifact Registry — Docker イメージの保管場所
resource "google_artifact_registry_repository" "app" {
  location      = var.region
  repository_id = var.service_name
  format        = "DOCKER"
  description   = "OSAKI亭 アプリケーション Docker イメージ"

  depends_on = [google_project_service.apis]
}
