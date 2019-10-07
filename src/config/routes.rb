Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/sandbox/sandbox', to: 'sandbox#index'
  post '/sandbox/sandbox/send', to: 'sandbox#send'
end
