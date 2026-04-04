output "cloud_run_url" {
  description = "Cloud Run サービスの URL"
  value       = google_cloud_run_v2_service.app.uri
}

output "artifact_registry" {
  description = "Docker イメージの push 先"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${var.service_name}/app"
}
