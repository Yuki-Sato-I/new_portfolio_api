class User < ApplicationRecord
  include Rails.application.routes.url_helpers
  has_one_attached :image

  def image_url
    image.attached? ? url_for(image) : nil
  end
  # 渡された文字列のハッシュ値を返す
  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end
  has_secure_password
end
