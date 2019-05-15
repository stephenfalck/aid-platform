class ConversationsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_request
    before_action :set_request_conversation, only: [:show, :update, :destroy] 

    def index
        @conversations = Conversation.all
        json_response(@conversations)
    end

    def create
        #@conversation = Conversation.create!(conversation_params)
        @conversation = Conversation.new(conversation_params)
        @conversation.user_id = current_user.id
        @conversation.save!

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
    def set_request
        @request = Request.find(params[:request_id])
    end

    def set_request_conversation
        @conversation = @request.conversations.find_by!(id: params[:id]) if @request
    end

    def conversation_params
        params.permit(:user_id, :request_id)
    end
end
