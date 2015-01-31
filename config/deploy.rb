# config valid only for Capistrano 3.1
# lock '3.1.0'

set :application, 'pbl_service_gateway'
set :repo_url, 'git@58.246.127.90:pbl/pbl_service_gateway.git'

# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call
set :branch, ENV['BRANCH'] || "master"

# Default deploy_to directory is /var/www/my_app
set :deploy_to, '/home/deployer/pbl_service_gateway'
# Default value for :scm is :git
set :scm, :git

# Default value for :format is :pretty
set :format, :pretty

# Default value for :log_level is :debug
set :log_level, :info

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, %w{config/database.yml}

# Default value for linked_dirs is []
# set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do

  desc 'Install nodejs dependencies, via npm.'
  task :npm_install do
    on roles(:app) do
      within release_path do
        # execute "npm", "install", "-g", "pm2"
        execute "npm", "install"
      end
    end
  end

  before :restart, :npm_install

end
