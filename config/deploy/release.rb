# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary server in each group
# is considered to be the first unless any hosts have the primary
# property set.  Don't declare `role :all`, it's a meta role.

# role :app, %w{root@10.10.31.110}


# Extended Server Syntax
# ======================
# This can be used to drop a more detailed server definition into the
# server list. The second argument is a, or duck-types, Hash and is
# used to set extended properties on the server.

# server 'root@124.202.141.248', user: 'root', roles: %w{app}


# Custom SSH Options
# ==================
# You may pass any option but keep in mind that net/ssh understands a
# limited set of options, consult[net/ssh documentation](http://net-ssh.github.io/net-ssh/classes/Net/SSH.html#method-c-start).
#
# Global options
# --------------
#  set :ssh_options, {
#    keys: %w(/home/rlisowski/.ssh/id_rsa),
#    forward_agent: false,
#    auth_methods: %w(password)
#  }
#
# And/or per server (overrides global)
# ------------------------------------
server '10.10.31.110',
       user: 'deployer',
       roles: %w{app},
       ssh_options: {
         user: 'root', # overrides user setting above
         # keys: %w(/Users/weston/.ssh/id_rsa),
         forward_agent: false,
         auth_methods: %w(password),
         password: '51448888'
       }


# Extend the deploy recipe.
namespace :deploy do
  #desc 'Run tests, prior to an application restart.'
  #task :test do
  #  on roles(:app), in: :sequence, wait: 5 do
  #    within release_path do
  #      execute "npm", "install", "-g", "mocha"
  #      execute "mocha"
  #    end
  #  end
  #end
  #after :npm_install, :test

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      within release_path do
        execute "pm2", "kill"
        execute "pm2", "start", "app.js",
                "-o", "logs/out.log",
                "-e", "logs/err.log",
                "-x", "--",
                "\"pbl_service_gateway\""
      end
    end
  end
  after :publishing, :restart
end

