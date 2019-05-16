class RepliesController < ApplicationController
    before_action :authenticate_user!
    before_action :set_reply, only: [:show, :update]

    def index
        @replies = Reply.all
        json_reply(@replies)
    end

    def show
        json_reply(@reply) 
    end

    def create
        @reply = Reply.new(reply_params)
        @reply.volunteer_id = current_user.id
        @reply.save!

        json_reply(@reply, :created)
    end

    def update
        @reply.update(reply_params)
        head :no_content
    end

    private
    def reply_params
        params.permit(:request_id, :volunteer_id, :active, :message_sent)
    end

    def set_reply 
        @reply = Reply.find(params[:id])
    end
end