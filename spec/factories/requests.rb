FactoryBot.define do
  factory :request do
    description { "MyString" }
    latitude { 1.5 }
    longitude { 1.5 }
    fulfilled { false } 
    user { nil }
  end
end
