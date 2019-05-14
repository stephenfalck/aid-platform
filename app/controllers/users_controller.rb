class UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]

    def index
        @users = User.all
        json_response(@users)
    end

    def show 
        json_response(@user)
    end

    private
    def user_params
        params.permit(:first_name, :last_name, :email, :password)
    end

    def set_user
        @user = User.find(params[:id])
    end
end
