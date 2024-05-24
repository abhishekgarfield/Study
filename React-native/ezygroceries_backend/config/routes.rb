Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "/shops", to: "shops#index"
    end
  end

end
