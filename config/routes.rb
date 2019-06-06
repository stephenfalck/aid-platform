Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {sign_in: 'login', sign_out: 'logout', registration: 'signup'}, 
              controllers: { sessions: "sessions", registrations: "registrations" }, defaults: { format: :json }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  #potentially needed for devise to work     root to: "home#index"

  resources :users, only: [:index, :show]

  resources :conversations do 
    resources :messages, only: [:index, :create]
  end

  get '/conversations/:conversation_id/users', to: 'users#index'
  get '/users/:user_id/conversations(.:format)', to: 'conversations#index'
  
  resources :requests

  #resources :conversations do 
  #  resources :messages, only: [:index, :create]
  #end

  resources :replies

end
