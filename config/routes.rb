Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :users, param: :id

  namespace :api do
    namespace :v1 do
      resources :categories, param: :id
      resources :tasks, param: :id

      get 'categories/:id/tasks', to: 'categories#list'

    end
  end

  post '/auth/login', to: 'authentication#login'
  post '/users/password', to: 'users#password'
  get '/*a', to: 'home#index'
  root to: 'home#index'
end
