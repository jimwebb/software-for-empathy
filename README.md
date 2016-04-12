Software for Empathy (Chrome Extension)
==========

"You can only understand people if you feel them in yourself." – John Steinbeck

This is a Chrome extension for walking in someone else's shoes. It modifies the current web page to simulate conditions that you may not personally experience but that many people do; like poor vision, shaky hands, and so forth.

Created as an experiment in making a Chome extension and presented at [Hack and Tell DC](http://dc.hackandtell.org/), April 2016. 

Modes
-----
- **Blurred Vision:** As we get older and our eyeballs change shape, it's harder to read small text. This simulation is what that might be like. (Uses CSS to add 1px blur.)
- **Shaky Mouse:** Parkinson's disease, a variety of palsies, and getting older can make our hands less steady. Web pages with small controls can be really hard to use; here's what that might be like. (Creates a fake mouse cursor and moves it with CSS.)
- **Dyslexia:** One in 10 people has dyslexia. This simulation semi-randomly swaps certain letters and words, according to a variety of sources on what [dyslexia is like](http://www.dyslexia.com/library/information.htm). 
- **Gender Pay Gap:** In the United States, women make about [77% of what men earn](https://en.wikipedia.org/wiki/Gender_pay_gap). (Use on a page that has a price, like an [Amazon.com product](http://smile.amazon.com/Accoutrements-12027-Horse-Head-Mask/).)
- **English as a Second Language:** One in five US residents doesn't speak English first; for them, complex sentences lose their meaning (as does a lot of nuance). This mimics that by machine-translating the page to Japanese and back. (This simulation is temperamental and slow. Sorry about that.)


Install
-----


Unpacked Extension
-----
- If you downloaded the code, unzip the file.
- Open (chrome://extensions/) or select the menu `Window > Extensions`.
- Enable the developer mode at top right.
- Click `Load unpacked extension...` and select the source code folder.
- Enjoy!


Development
-----
Want to help? Fork away!


License
----
[MIT](https://opensource.org/licenses/MIT)