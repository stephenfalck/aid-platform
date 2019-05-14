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

    describe 'POST /signup' do
        let(:valid_attributes) {{first_name: 'Frank', last_name: 'Lampard', email: 'fl@email.com', password: 'password'}} 

        #context 'when the request is valid' do 
        #    before { post '/signup', params: valid_attributes }
#
        #    it 'creates a user' do
        #        expect(json['first_name']).to eq('Frank')
        #    end
#
        #    it 'returns status code 201' do
        #        expect(response).to have_http_status(201)
        #    end
#
        #end

        context 'when user is unauthenticated' do
            before { post '/signup', params: valid_attributes }
        
            it 'returns 200' do
              expect(response.status).to eq 200
            end
        
            it 'returns a new user' do
              expect(response.body).to match_schema('user')
            end
        end

        context 'when user already exists' do
            before { post '/signup', params: {first_name: users.first.first_name, last_name: users.first.last_name, email: users.first.email, password: users.first.password} }
        
            it 'returns bad request status' do
              expect(response.status).to eq 400
            end
        
            it 'returns validation errors' do
              expect(json['errors'].first['title']).to eq('Bad Request')
            end
        end

        context 'when the request is invaild' do
            before { post '/users', params: {first_name: 'Random', email: 'fl@email.com', password: 'password'} }

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

    describe 'POST/login' do 
        context 'when params are correct' do
            before { post '/login', params: {email: users.first.email, password: users.first.encrypted_password} }

            it 'returns a status code of 200' do
                expect(response).to have_http_status(200)
            end

            it 'returns JWT token in authorization header' do
                expect(response.headers['Authorization']).to be_present
            end

            it 'returns valid JWT token' do
                decoded_token = decoded_jwt_token_from_response(response)
                expect(decoded_token.first['sub']).to be_present
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