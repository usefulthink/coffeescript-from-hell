coffeescript-from-hell
======================

Title says it all, doesn't it?

Believe it or not: all of the snippets below are valid coffeescript and mostly compile into something weird...


## Some normal sentences that are totally valid coffeescript

[we don't need it](http://coffeescript.org/#try:Drink%20a%20lot%20for%20yourself%20in%20the%20pub%20when%20you%20need%20it%20-%20me%20and%20my%20friends%20dont%2C%20do%20you%3F) (by @usefulthink)
```coffee
Drink a lot for yourself in the pub when you need it - me and my friends dont, do you?
```
[ballmers peak](http://coffeescript.org/#try:do%20not%20try%20coffeescript%20if%20you%20have%20alcohol%20in%20your%20blood) (by @levito)
```coffee
do not try coffeescript if you have alcohol in your blood
```
[ball games](http://coffeescript.org/#try:throw%20the%20ball%20and%20try%20to%20catch%20it) (by @ZauberNerd)
```coffee
throw the ball and try to catch it
```
[future?](http://coffeescript.org/#try:do%20you%20know%20if%20this%20is%20the%20future%3F) (by @levito)
```coffee
do you know if this is the future?
```
[you = _error](http://coffeescript.org/#try:try%20to%20drink%20beer%20until%20youre%20drunk%20if%20this%20isnt%20happening%20do%20not%20stop%20unless%20they%20catch%20you) (by @ZauberNerd)
```coffee
try to drink beer until youre drunk if this isnt happening do not stop unless they catch you
```
[one pint](http://coffeescript.org/#try:drink%20for%20each%20of%20your%20friends%20one%20pint%20of%20beer%20unless%20youre%20drunk%20then%20stop%20or%20not%20go%20to%20work%20the%20next%20day) (by @ZauberNerd)
```coffee
drink for each of your friends one pint of beer unless youre drunk then stop or not go to work the next day
```
[robot overlords](http://coffeescript.org/#try:I%20for%20one%20in%20many%20welcome%20our%20new%20robot%20overlords%20when%20they%20have%20cookies%20in%20their%20spaceship) (by @ZauberNerd and @usefulthink) - [with instrumentation](http://goo.gl/SUk8X7)
```coffee
I for one in many welcome our new robot overlords when they have cookies in their spaceship
```
[ball games 2](http://coffeescript.org/#try:we%20try%20to%20throw%20the%20ball%20until%20you%20catch%20it%3B%20at%20least%20one%20in%20many.%20if%20this%20isnt%20happening%20until%20dawn%20while%20we%20practice%20go%20home) (by @ZauberNerd)
```coffee
we try to throw the ball until you catch it; at least one in many. if this isnt happening until dawn while we practice go home
```
[coding style](http://coffeescript.org/#try:switch%20your%20coding%20style%0A%20%20when%20your%20coworker%20isnt%20fluid%20in%20coffeescript.%0A%20%20if%20he%20is%20fluid%20then%20do%20try%20to%20use%20it%20for%20everything%20in%20your%20company) (by @ZauberNerd)
```coffee
switch your coding style
  when your coworker isnt fluid in coffeescript.
  if he is fluid then do try to use it for everything in your company
```

[about coffeescript](http://goo.gl/VcL5KX)
```coffee
while coffeescript can be done in a beautyful way, a lot of it may
  break unless you pay a lot of attention.
  thats not how we like it

writing is easy - but reading... #(
```

## A little bit of "language" - "features"

```coffee
myFunction = (a,b,c) -> console.log a, b, c

# now, lets call this, right - great that we may skip the parentheses, right?
myFunction 1, 2, 3
myFunction a:1, b:2, c:3
myFunction 1, b:2, c:3
myFunction a:1, b, c
```
