Rails.application.routes.draw do

  root 'sessions#new'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  resources :users
  resources :works
  resources :skills
  resources :histories

  namespace 'api' do
    namespace 'v1' do
      get '/users/:id', to: 'users#api_show'
      get '/works', to: 'works#api_index'
      get '/works/top', to: 'works#api_top'
      get '/works/:id', to: 'works#api_show'
      get '/skills', to: 'skills#api_index'
      get '/skills/:id', to: 'skills#api_show'
      get '/histories', to: 'histories#api_index'
      get '/histories/:id', to: 'histories#api_show'
    end
  end
  
end
