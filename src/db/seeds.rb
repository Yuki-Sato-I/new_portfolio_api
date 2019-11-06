# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create!(image: '', name: '佐藤裕紀', age: 21, profession: '学生', content: '自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。')


(1..10).each do |num|
  Work.create!(image: '', title: "work_title_#{num}", content: "work_content_#{num}", url: 'http://herokuavv.dl', status: 1, release_at: Time.zone.now)
end

(1..10).each do |num|
  History.create!(image: '', title: "history_title_#{num}", content: "history_content_#{num}", start_at: Time.zone.now.ago(3.month), end_at: Time.zone.now.ago(2.month))
end

(1..10).each do |num|
  Skill.create!(name: "skill_name_#{num}")
end

(1..10).each do |num|
  WorkSkill.create!(work_id: num, skill_id: num)
end