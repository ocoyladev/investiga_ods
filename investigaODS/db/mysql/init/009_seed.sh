#!/bin/sh
set -euo pipefail

# Ensure schema is applied (idempotent)
mysql -uroot -p"${MYSQL_ROOT_PASSWORD:-}" < /docker-entrypoint-initdb.d/001_schema.sql || true

# Run seed with correct client charset to preserve UTF-8 content
mysql --default-character-set=utf8mb4 -uroot -p"${MYSQL_ROOT_PASSWORD:-}" investigaods < /docker-entrypoint-initdb.d/010_seed.sql

# Prevent the entrypoint from running the plain .sql seed again
mv /docker-entrypoint-initdb.d/010_seed.sql /docker-entrypoint-initdb.d/010_seed.sql.applied || true

