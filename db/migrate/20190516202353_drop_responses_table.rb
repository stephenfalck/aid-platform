class DropResponsesTable < ActiveRecord::Migration[5.2]
  def change
    drop_table :responses
  end
end
