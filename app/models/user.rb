class User < ApplicationRecord
    has_many :requests, dependent: :destroy

    validates_presence_of :first_name, :last_name, :email, :encrypted_password
end
