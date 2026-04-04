variable "project_id" {
  description = "GCP プロジェクト ID"
  type        = string
}

variable "region" {
  description = "GCP リージョン"
  type        = string
  default     = "asia-northeast1"
}

variable "service_name" {
  description = "Cloud Run サービス名"
  type        = string
  default     = "osaki-tei"
}

variable "database_url" {
  description = "PostgreSQL 接続文字列"
  type        = string
  sensitive   = true
}

variable "better_auth_secret" {
  description = "Better Auth シークレットキー"
  type        = string
  sensitive   = true
}

variable "cloud_run_url" {
  description = "Cloud Run サービスの URL (初回デプロイ後に設定)"
  type        = string
  default     = ""
}
