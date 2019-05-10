require 'rails_helper'

RSpec.describe 'Users API', type: :request do
    let!(:users) { create_list(:user, 10) }
    let(:user_id) { users.first.id }

    describe 'GET /users' do
        before { get "/users" }

        it 'returns users' do
            expect(json).not_to be_empty
            expect(json.size).to eq(10)
        end

        it 'returns status code 200' do
            expect(response).to have_http_status(200)
        end
    end

    describe 'GET /users/:id' do
        before { get "/users/#{user_id}" }

        context 'when the user exists' do
            it 'returns the user' do
              expect(json).not_to be_empty
              expect(json['id']).to eq(user_id)
            end

            it 'returns status code 200' do
                expect(response).to have_http_status(200)
            end
        end

        context 'when the user does not exist' do
            let(:user_id) { 100 }

            it 'returns status code 404' do
                expect(response).to have_http_status(404)
            end

            it 'returns a not found message' do
                expect(response.body).to match(/Couldn't find User/)
            end
        end
    end

    describe 'POST /users' do
        let(:valid_attributes) {{first_name: 'Frank', last_name: 'Lampard', email: 'fl@email.com', password_digest: 'password'}} 

        context 'when the request is valid' do 
            before { post '/users', params: valid_attributes }

            it 'creates a user' do
                expect(json['first_name']).to eq('Frank')
            end

            it 'returns status code 201' do
                expect(response).to have_http_status(201)
            end

        end

        context 'when the request is invaild' do
            before { post '/users', params: {first_name: 'Random', email: 'fl@email.com', password_digest: 'password'} }

            it 'returns status code 422' do
                expect(response).to have_http_status(422)
            end

            it 'returns a validation failure message' do
                expect(response.body)
                  .to match(/Validation failed: Last name can't be blank/)
            end
        end
    end

    describe 'DELETE /users/:id' do
        before { delete "/users/#{user_id}" }
    
        it 'returns status code 204' do
            expect(response).to have_http_status(204)
        end
    end
end