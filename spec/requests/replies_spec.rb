require 'rails_helper'

RSpec.describe 'replies API', type: :request do
    let!(:user) { create :user, :with_image }
    let!(:replies) { create_list :reply, 5 }
    let!(:reply) { replies.first }

    before { sign_in user }

    describe 'GET replies' do
        before { get "/replies"}

        it "returns replies" do
            expect(json).not_to be_empty
            expect(json.size).to eq(5)
        end

        it 'returns a status request of 200' do
            expect(reply).to have_http_status(200)
        end
    end

    describe 'GET replies/:id' do
        before { get "/replies/#{reply.id}"}
        
        context 'when reply exists' do
            it "returns reply" do
                expect(json).not_to be_empty
                expect(json['id']).to eq(reply.id)
            end

            it 'returns a status request of 200' do
                expect(reply).to have_http_status(200)
            end
        end

        context 'when the request does not exist' do
            it 'returns status code 404' do
                get "/repliess/#{200}"
                expect(reply).to have_http_status(404)
            end

            it 'returns a not found message' do
                expect(reply.body).to match(/Couldn't find reply with 'id'=200/)
            end
        end
    end

    describe "POST /replies" do
        let(:valid_attributes) {{request_id: 6, active: true , message_sent: true}}

        context 'when the reponse is valid' do 
            before { post '/replies', params: valid_attributes }

            it 'creates a reply' do
                expect(json['active']).to eq(true)
            end

            it 'returns status code 201' do
                expect(reply).to have_http_status(201)
            end

        end

        context 'when the request is invaild' do
            before { post '/requests', params: {active: true, message_sent: true} }

            it 'returns status code 422' do
                expect(reply).to have_http_status(422)
            end

            it 'returns a validation failure message' do
                expect(reply.body)
                  .to match(/Validation failed: Request id can't be blank/)
            end
        end
    end

    describe 'PUT /replies/:id' do
        let(:valid_attributes) { { active: true } }

        before { put "/replies/#{reply.id}", params: valid_attributes }

        context 'when reply exists' do
            it 'returns status code 204' do
                expect(reply).to have_http_status(204)
            end

            it 'updates the reply' do
                updated_reply = reply.find(reply.id)
                expect(updated_reply.active).to match(true)
            end
        end

        context 'when the reply does not exist' do
            it 'returns status code 404' do
                put "/replies/#{200}", params: {message_sent: true}
                expect(reply).to have_http_status(404)
            end

            it 'returns a not found message' do
                put "/replies/#{reply.id}", params: {message_sent: true}
                expect(reply.body).to match(/Couldn't find reply with 'id'=0/)
            end
        end
    end
end