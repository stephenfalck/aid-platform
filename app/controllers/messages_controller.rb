class MessagesController < ApplicationController
    before_action :set_conversation

    def index
        @messages = Message.all
        json_response(@messages)
    end

    def create
        @message = Message.create!(message_params)
        json_response(@message, :created)
    end
    
    private
    def set_conversation
        @conversation = Conversation.find(params[:conversation_id])
    end

    def message_params
        params.permit(:text, :user_id, :conversation_id)
    end
end
