require 'rails_helper'

RSpec.describe 'Conversations API' do 
    let!(:user) { create(:user) }
    let!(:users) { create_list(:user, 5 ) }
    let!(:request) { create(:request, user_id: users.first.id) }
    let!(:conversations) { create_list(:conversation, 5, user_id: users.second.id, request_id: request.id) }
    let(:request_id) { request.id }
    let(:id) { conversations.first.id }

    
    describe 'GET requests/:request_id/conversations' do
        before { get "/requests/#{request_id}/conversations" }

        context 'when request exists' do
            it 'returns a status code of 200' do
                expect(response).to have_http_status(200)
            end

            it 'returns all request conversations' do
                expect(json.size).to eq(5)
            end
        end

        context 'when a request does not exist' do
            let(:request_id) { 0 }

            it 'returns a status code of 404' do
                expect(response).to have_http_status(404)
            end

            it 'returns a not found message' do
                expect(response.body).to match(/Couldn't find Request with 'id'=0/)
            end
        end
    end

    describe 'GET /requests/:request_id/conversations/:id' do
        before { get "/requests/#{request_id}/conversations/#{id}" }

        context 'where the request conversation exists' do
            it 'returns a status code of 200' do
                expect(response).to have_http_status(200)
            end

            it 'returns the conversation' do
                expect(json['id']).to eq(id)
            end
        end

        context 'where the request conversation does not exist' do
            let(:id) { 1 }
            it 'returns a status code of 404' do
                expect(response).to have_http_status(404)
            end

            it 'returns a not found message' do
                expect(response.body).to match(/Couldn't find Conversation/)
            end
        end
    end

    describe 'POST /requests/:request_id/conversations' do
        let(:valid_attributes) { { user_id: users.second.id, request_id: 5 } }

        context 'when conversation attributes are valid' do
            before { post "/requests/#{request_id}/conversations", params: valid_attributes }

            it 'returns a status code of 201' do
                expect(response).to have_http_status(201)
            end
        end

        context 'when invalid conversation params' do
            before { post "/requests/#{request_id}/conversations", params: {} }

            it 'returns a status code of 422' do
                expect(response).to have_http_status(422)
            end

            it 'returns a failure message' do
                expect(response.body).to match(/Validation failed: User_id can't be blank/)
            end
        end
    end

    describe 'DELETE /conversations/:id' do
        before { delete "/requests/#{request_id}/conversations/#{id}" }

        it 'returns status code 204' do
            expect(response).to have_http_status(204)
        end
    end   
end