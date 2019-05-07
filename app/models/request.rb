class Request < ApplicationRecord
  belongs_to :user
  has_many :conversations

  validates_presence_of :description, :latitude, :longitude, :fulfilled
end
