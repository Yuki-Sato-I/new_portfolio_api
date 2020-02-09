FROM ruby:2.5.3
ENV LANG C.UTF-8
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs vim && rm -rf /var/lib/apt/lists/*
# yarnパッケージ管理ツールをインストール
RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn
# Node.jsをインストール
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install nodejs
RUN gem install bundler
WORKDIR /tmp
COPY src/Gemfile Gemfile
COPY src/Gemfile.lock Gemfile.lock
RUN bundle install
ENV APP_HOME /app_name
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
COPY ./src $APP_HOME
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
