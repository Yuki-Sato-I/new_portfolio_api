# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create!(image: "image", name: '佐藤 裕紀', email: 'yukitryprogram@gmail.com', password: "foobar", password_confirmation: "foobar", en_name: 'Yuki Sato', age: 21, profession: '学生', content: '自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。', service: '自分が何を重視しているか入りますz')


(1..10).each do |num|
  Work.create!(image: "image_#{num}", title: "work_title_#{num}", content: "work_content_#{num}", reason: "#{num}番目の理由", appeal: "#{num}番目のアピールが入ります", period: '3ヶ月', url: "http://herokuavv.dl#{num}", status: 1, release_at: Time.zone.now.ago(num.month))
end

(1..10).each do |num|
  History.create!(image: "image_#{num}", title: "history_title_#{num}", content: "history_content_#{num}", start_at: Time.zone.now.ago((num+2).month), end_at: Time.zone.now.ago(num.month))
end

(1..10).each do |num|
  Skill.create!(name: "skill_name_#{num}")
end

(1..10).each do |num|
  WorkSkill.create!(work_id: num, skill_id: num)
end