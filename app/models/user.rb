class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :jwt_authenticatable, jwt_revocation_strategy: JWTBlacklist
          #:registerable, :recoverable, :rememberable, :validatable

    has_many :requests, dependent: :destroy
    has_many :messages
    has_and_belongs_to_many :conversations

    validates :email, presence: true, format: { with: /\A[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\z/i }, uniqueness: true
    validates_presence_of :first_name, :last_name, :password

end
