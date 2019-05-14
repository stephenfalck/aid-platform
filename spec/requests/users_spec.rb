require 'rails_helper'
require 'devise/jwt/test_helpers'

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

    describe 'POST /signup' do
        let(:valid_attributes) {{first_name: 'Frank', last_name: 'Lampard', email: 'fl@email.com', password: 'password'}} 

        context 'when request is valid' do
            before { post '/signup', params: valid_attributes }
        
            it 'returns 201' do
              expect(response).to have_http_status(201)
            end
        
            it 'returns a new user' do
              expect(json['first_name']).to eq('Frank')
            end

            it 'returns JWT token in authorization header' do
                expect(response.headers['Authorization']).to be_present
            end

            it 'returns valid JWT token' do
                post '/signup', params: valid_attributes 
                token = JSON.parse(response.body)['token']

                expect{ JWT.decode(token, key) }.to_not raise_error(JWT::DecodeError)
            end
        end

        context 'when user already exists' do
            before { post '/signup', params: {first_name: users.first.first_name, last_name: users.first.last_name, email: users.first.email, password: users.first.password} }
        
            it 'returns bad request status' do
              expect(response.status).to eq 422
            end
        
            it 'returns validation errors' do
              json_response = JSON.parse(response.body)
              expect(json_response).to include("errors" => {"email"=>["has already been taken"]})
            end
        end

        context 'when the request is invaild' do
            before { post '/signup', params: {first_name: 'Random', email: 'fl@email.com', password: 'password'} }

            it 'returns status code 422' do
                expect(response).to have_http_status(422)
            end

            it 'returns a validation failure message' do
                json_response = JSON.parse(response.body)
                expect(json_response).to include("errors" => {"last_name"=>["can't be blank"]})
            end
        end
    end

    describe 'DELETE /signup' do

        it 'returns status code 204' do

            user = users.first
            headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
            # This will add a valid token for `user` in the `Authorization` header
            auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)

            delete "/signup", headers: auth_headers
        
            expect(response).to have_http_status(204)
        end
    end

    describe 'POST /login' do 
        context 'when params are correct' do
            before { post '/login', params: {user: { email: users.first.email, password: users.first.password} } }

            it 'returns a status code of 200' do
                expect(response).to have_http_status(200)
            end

            it 'returns JWT token in authorization header' do
                expect(response.headers['Authorization']).to be_present
            end

            it 'returns valid JWT token' do
                token = JSON.parse(response.body)['token']

                expect{ JWT.decode(token, key) }.to_not raise_error(JWT::DecodeError)
            end
        end

        context 'when login params are incorrect' do
            before { post '/login', params:{} }

            it 'returns unathorized status' do
                expect(response.status).to eq 401
            end
        end
    end

    describe 'DELETE /logout' do
        before { delete '/logout' }

        it 'returns a status code of 204' do
            expect(response).to have_http_status(204)
        end
    end
end