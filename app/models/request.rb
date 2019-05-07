class Request < ApplicationRecord
  belongs_to :user

  validates_presence_of :description, :latitude, :longitude, :fulfilled
end
