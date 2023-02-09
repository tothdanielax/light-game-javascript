# light-game-javascript
Light game implemented with vanilla JavaScript and Bootstrap.


<p>Nekeresdországban Nevenincs királynak egyik szeme sír, a másik nevet. Nevet, mert végre elkészült a hatalmas kacsalábon forgó palotája, sok-sok tágas szobával és folyosóval. Ugyanakkor sír is, mert ezeket a helyiségeket be kell világítani és melegen kell tartani, azonban az aktuális rezsiemelkedés őt is érinti. Itt az ideje tehát elgondolkodni, hogy pontosan hová is helyezzünk el villanykörtéket, hogy minden megfelelően be legyen világítva; ugyanakkor csak oda helyezzünk el izzót, ahol ténylegesen szükség is van rá.</p>

<h2>A játék leírása</h2>
<ul>
<li>A királynak négyzet alapú szobái vannak, amelyek fekete és fehér cellákból állnak.</li>
<li>A fehér cellákba villanykörtéket lehet elhelyezni.</li>
<li>A villanykörtékből a fény átlósan nem terjed, csak az adott sor és oszlop mentén.</li>
<li>A fekete cellákon valamilyen tereptárgy van, ami akadályozza a fény terjedését.</li>
<li>A fekete cellák opcionálisan egy egész számot is tartalmazhatnak 0-tól 4-ig. Ez azt jelzi, hogy hány szomszédos (alul, felül, jobbra, balra) cella tartalmaz villanykörtét. Ha van ilyen szám, akkor be kell tartani!</li>
<li>Két villanykörte soha nem világíthatja meg egymást!</li>
<li>A játék célja a villanykörtéket úgy elhelyezni, hogy minden fehér cellát megvilágítsanak.</li>
<li>A játékot egy játékos játssza, amíg meg nem oldja a rejtvényt, tehát több játékos egyidejű kezeléséről vagy körökre osztásról nem kell gondoskodni.</li>
</ul>
<h3>Játékmenet példa (Markdown limitáció a megjelenítésben)</h3>
<ol>
<li>
<strong>A játék kezdete.</strong> A játéktéren a pályaelemeken (alapértelmezetten fehér cellák, vagy fekete cellák számmal vagy anélkül) kívül nincs más, nincs elhelyezve egyetlen villanykörte sem.</li>
</ol>
<table>
<tbody>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">1</td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">0</td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">2</td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">2</td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">3</td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
</tbody>
</table>
<ol>
<li>
<strong>Köztes állapot. </strong>A játékos kattintással villanykörtét helyez el, esetleg felveszi a korábban elhelyezett izzók egyikét. Vegyük észre, hogy a fény csak az izzó sorában és oszlopában terjed, illetve nem hatol át a fekete cellákon!</li>
</ol>
<table style="border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1">
<tbody>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">1</td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">0</td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">2</td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: black; width: 2em;"></td>
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">2</td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">3</td>
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
</tr>
</tbody>
</table>
<ol start="3">
<li>
<strong>A játék vége.</strong> A játékos akkor nyert, ha minden fehér cella a játékszabályoknak megfelelően megvilágítást kap.</li>
</ol>
<table style="border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1">
<tbody>
<tr style="height: 2em;">
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">1</td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
<td style="background-color: lightyellow; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">0</td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">2</td>
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
</tr>
<tr style="height: 2em;">
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: black; width: 2em;"></td>
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
<td style="background-color: lightyellow; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">2</td>
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
</tr>
<tr style="height: 2em;">
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em; text-align: center;">💡</td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">3</td>
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
</tr>
</tbody>
</table>

<h3 id="p-lda-helytelen-megold-sra">Példa helytelen megoldásra</h3>
<p>Az alábbi megoldás <strong>helytelen</strong> (attól függetlenül, hogy valóban minden fehér cella megvilágításra került), mert két villanykörte egymást is megvilágítja!</p>
<table style="border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1">
<tbody>
<tr style="height: 2em;">
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">1</td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
<td style="background-color: lightyellow; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">0</td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">2</td>
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
</tr>
<tr style="height: 2em;">
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: black; width: 2em;"></td>
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="text-align: center; background-color: lightcoral; width: 2em;">💡</td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; background-color: lightcoral; width: 2em;">💡</td>
<td style="background-color: lightyellow; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="text-align: center; background-color: lightyellow; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">2</td>
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
</tr>
<tr style="height: 2em;">
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">3</td>
<td style="text-align: center; background-color: lightyellow; width: 2em;">💡</td>
<td style="background-color: lightyellow; width: 2em;"></td>
<td style="background-color: lightyellow; width: 2em;"></td>
</tr>
</tbody>
</table>

<h2 id="mintap-ly-k">Mintapályák</h2>
<p>Az alábbi három táblázatban egy-egy nehézségi fokozathoz tartozó kiinduló táblát mutatunk be. Természetesen lehet más elrendezésekben gondolkodni, de minden esetben legyen rajta kellő számú fekete cella, és azok közül néhányban számok is. <strong>Ha jól paraméterezed a feladatot, akkor csak egy megoldása lesz a rejtvénynek.</strong></p>
<ol start="1">
<li>Könnyű 7x7-es pálya:</li>
</ol>
<table style="border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1">
<tbody>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">1</td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">0</td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">2</td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">2</td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">3</td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
</tbody>
</table>
<ol start="2">
<li>Haladó 7x7-es pálya:</li>
</ol>
<table style="border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1">
<tbody>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">0</td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">3</td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">1</td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="text-align: center; color: white; background-color: black; width: 2em;">2</td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">2</td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
</tbody>
</table>
<ol start="3">
<li>Extrém 10x10-es pálya:</li>
</ol>
<table style="border-collapse: collapse; margin-left: auto; margin-right: auto;" border="1">
<tbody>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">3</td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">2</td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">0</td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">1</td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">1</td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">3</td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">1</td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">0</td>
<td style="background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="text-align: center; color: white; background-color: black; width: 2em;">3</td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">0</td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
</tr>
<tr style="height: 2em;">
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="background-color: white; width: 2em;"></td>
<td style="text-align: center; color: white; background-color: black; width: 2em;">0</td>
<td style="background-color: white; width: 2em;"></td>
</tr>
</tbody>
</table>
