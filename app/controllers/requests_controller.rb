class RequestsController < ApplicationController
before_action :set_request, only: [:show, :update, :destroy]

    def index
        @requests = Request.all
        json_response(@requests)
    end

    def show
        json_response(@request)
    end

    def create
        @request = Request.create!(request_params)
        json_response(@request, :created)
    end

    def update
        @request.update(request_params)
        head :no_content
    end

    def destroy
        @request.destroy
        head :no_content
    end


    private 
    def request_params
        params.permit(:latitude, :longitude, :fulfilled, :description, :user_id)
    end

    def set_request
        @request = Request.find(params[:id])
    end

end
