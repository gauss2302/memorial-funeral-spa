
#!/bin/sh
# nginx-entrypoint.sh

echo "Waiting for volume to be ready..."
sleep 20

echo "Fixing permissions for /usr/share/nginx/html..."
chown -R nginx:nginx /usr/share/nginx/html
chmod -R 755 /usr/share/nginx/html
find /usr/share/nginx/html -type f -exec chmod 644 {} \;

echo "Permissions fixed. Starting nginx..."
exec nginx -g "daemon off;"