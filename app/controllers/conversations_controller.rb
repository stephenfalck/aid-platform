class ConversationsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_conversation, only: [:show, :update, :destroy]

    def index
        @conversations = Conversation.all
        json_response(@conversations)
    end

    def create
        @conversation = Conversation.create!

        @user = User.find(params[:user_id])
        @user2 = User.find(params[:user_id_2])

        @conversation_users = @conversation.users
        @conversation_users << @user
        @conversation_users << @user2
        

        json_response(@conversation, :created)
    end

    def show
        json_response(@conversation)
    end

    def update
        @conversation.update(conversation_params)
        head :no_content
    end

    def destroy
        @conversation.destroy
        head :no_content
    end

    private
    def conversation_params
        params.permit(:user_id, :user_id_2)
    end
    def set_conversation
        @conversation = Conversation.find(params[:id])
    end
end
