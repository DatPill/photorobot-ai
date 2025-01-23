FROM debian:latest
ARG MAX_EXECUTION_TIME
ARG FRONT_SERVER_NAME

# Install nginx and certbot
RUN apt-get update && apt-get install -y nginx certbot python3-certbot-nginx

# Configure Nginx
ADD nginx.conf /etc/nginx/
RUN sed "/fastcgi_read_timeout 60s;/c\  fastcgi_read_timeout ${MAX_EXECUTION_TIME}s;" -i /etc/nginx/nginx.conf
ADD front.conf /etc/nginx/sites-available/

RUN sed "/server_name localhost;/c\  server_name ${FRONT_SERVER_NAME};" -i /etc/nginx/sites-available/front.conf

RUN usermod -u 1000 www-data

# Configure the virtual host
RUN ln -s /etc/nginx/sites-available/front.conf /etc/nginx/sites-enabled/front

RUN rm /etc/nginx/sites-enabled/default

# Run Nginx
CMD nginx

# Expose ports
EXPOSE 80
EXPOSE 443