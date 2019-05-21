class SessionsController < Devise::SessionsController
    respond_to :json

    #doesn't work in rspec so have nested the arrtibutes within user in the request spec
    wrap_parameters :user
  
    private

    def respond_with(resource, _opts = {})
      render json: resource
    end
  
    def respond_to_on_destroy
      head :no_content
    end
end