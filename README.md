## Version
ruby version 2.5.3

rails version 6.0.0

### 起動の仕方

```
docker-compose up 
```

ローカル
```
localhost:3000
```

本番
```
http://a.intern.ate.am:3000/
```


DBいじったら
```
docker-compose run web rails db:migrate
```
