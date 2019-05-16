class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    private
    def sign_up_params
      params.permit(  :first_name,
                      :last_name, 
                      :email, 
                      :image,
                      :password,
                      :password_confirmation)
    end
end