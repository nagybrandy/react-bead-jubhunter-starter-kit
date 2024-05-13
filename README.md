# jobhunter

*Kliensoldali webprogramozás 2. beadandó*
## Nyilatkozat
Kérlek, töltsétek ki az adataitokkal beadás előtt!

```
<Hallgató neve>
<Neptun kódja>
Kliensoldali webprogramozás - beadandó
Ezt a megoldást a fent írt hallgató küldte be és készítette a Kliensoldali webprogramozás kurzus számonkéréséhez.
Kijelentem, hogy ez a megoldás a saját munkám. Nem másoltam vagy használtam harmadik féltől
származó megoldásokat. Nem továbbítottam megoldást hallgatótársaimnak, és nem is tettem közzé.
Az Eötvös Loránd Tudományegyetem Hallgatói Követelményrendszere
(ELTE szervezeti és működési szabályzata, II. Kötet, 74/C. §) kimondja, hogy mindaddig,
amíg egy hallgató egy másik hallgató munkáját - vagy legalábbis annak jelentős részét -
saját munkájaként mutatja be, az fegyelmi vétségnek számít.
A fegyelmi vétség legsúlyosabb következménye a hallgató elbocsátása az egyetemről.
```

## **A feladat leírása**

A feladat egy álláskereső oldal létrehozása, ami segíti a felhasználókat a munkakeresésben. A weboldalra kétféle felhasználót tudunk regisztrálni: **munkavállalót**, vagy **munkáltatót**. Mindkét szerepkör más-más funkciókat ér el.

A feladatot *React* és *Redux* kombinációjával kell megoldanod. Redux esetében ajánlott a *redux toolkit* és akár az *RTK Query* használata. Mivel az alkalmazás több oldalból áll, a *react-router* használata javasolt. A feladatban adott a szerveroldali REST API, leírását lentebb olvashatjátok, ehhez kell igazodnia a kliensnek.

Ugyan segítségképp mellékeltünk egy webdesignt, **nem elvárás** a design lefejlesztése, csak útmutatásképp szolgálnak az illusztrációk.

## Navigáció

Minden oldal tetején megjelenik egy navigációs sáv, ahol az alkalmazás neve és az elérhető funkciók vannak menüpontokban megjelenítve:

- Jobhunter (ez az alkalmazás neve, rákattintva főoldalra visz)
- Ha nincs bejelentkezve
    - Főoldal - Álláshirdetések listázása
    - Regisztráció
    - Bejelentkezés
- Bejelentkezve munkavállalóként
    - Főoldal - Álláshirdetések listázása
    - Profilom - Felhasználó adatai, profil szerkesztése
    - Kijelentkezés
- Bejelentkezve munkáltatóként
    - Főoldal - Álláshirdetések listázása
    - Profilom - Kilistázva a felhasználó által meghirdetett munkalehetőségek
    - Álláshirdetés hozzáadása - Űrlap
    - Kijelentkezés

## Oldalak

### Bejelentkezés nélkül

Bejelentkezés nélkül a vendég felhasználók az alábbi oldalakat tekinthetik meg:

- Főoldal: Álláslehetőségek kilistázódnak, van egy szűrő rész, amivel szűrni tudunk a következő mezők alapján:
    - fizetési sáv
    - foglalkoztatottság típusa (full-time, part-time, internship)
    - település
    - van-e home-office lehetőség
- Bejelentkezés oldala
    - E-mail és jelszó párossal autentikálhatja magát a felhasználó
- Regisztráció oldala
    - Kiválasztható a profil típusa (Munkáltató / Munkavállaló)
    - Munkavállaló típus esetén megadhatóak a korábbi munkatapasztalatok:
        - Több-soros szöveges beviteli mezőben, amiben soronként tördelve meg tudjuk adni a munkahelyeinket és a hozzá tartozó pozíciót, illetve a tól-ig évszámot.
        
        ```json
        Halo Haven;Front-end fejlesztő;2021-2022
        Dunder Mifflin;Full-stack fejlesztő;2022-
        
        ```
        

### Munkavállalóként regisztrált felhasználó

**Oldal: Állások listázása**

- A felhasználó böngészhet az összes álláshirdetés között
- A felhasználó az alábbi tulajdonságok alapján szűrhet az ajánlatok között:
    - fizetési sáv
    - foglalkoztatottság típusa (full-time, part-time, internship)
    - település
    - van-e home-office lehetőség

![landing](./images/landing_logout-1.png)

**Oldal: Profil**

- A felhasználó profilján listázásra kerülnek a profilhoz tartozó adatai
- A megadott korábbi tapasztalatok szerkeszthetőek

![landing](./images/profile_employee.png)

**Oldal: Álláshirdetés adatlapja**

- Egy álláshirdetést megnyitva a felhasználó megtekintheti az álláshirdetés adatlapját
- Az álláshirdetés adatlapján bejelentkezett munkavállalónak lehetősége van jelentkezni az adott állásra

![landing](./images/company_details_employee.png)

### Munkáltatóként regisztrált felhasználó

**Oldal: Profil**

- Listázásra kerülnek a munkáltató korábban hozzáadott álláshirdetései
- Az egyes listaelemekhez a következő akciók tartoznak:
    - Megtekintés - Az adott álláshirdetésre jelentkezett munkavállalók megtekintése
    - Szerkesztés
    - Törlés
- A felhasználónak lehetősége van új hirdetéseket közzétenni az itt szereplő “Hozzáadás” gomb segítségével

![landing](./images/profile_company.png)

**Oldal: Álláshirdetés adatlapja**

- Egy álláshirdetés kapcsán a megtekintés akciót választva a felhasználó megtekintheti azon felhasználók listáját, akik jelentkeztek a hirdetésre. A felhasználók listázásra kerülnek, és megtekinthető az adatlapjuk.

**Oldal: Álláshirdetés hozzáadása, Álláshirdetés szerkesztése**

Álláshirdetés hozzáadása és szerkesztése során az alábbi tulajdonságok állíthatóak be:

- Cég neve - szöveges beviteli mező
- Pozíció neve - szöveges beviteli mező
- Leírás - Több-soros szöveges beviteli mező
- Fizetési sáv (-tól, -ig) - szám beviteli mezők (Az intervallum szélső értékeinek megadása két űrlapelem segítségével történik)
- Foglalkoztatás formája - legördülő mező. Lehetőségek:
    - Teljes állás (full-time)
    - Részmunkaidős (part-time)
    - Gyakornoki (internship)
- Település - szöveges beviteli mező
- Van-e home office lehetőség - checkbox

![landing](./images/company_details_employee.png)

## **A kliens**

Az alkalmazást a `client` mappában kell elkészíteni. A mappa egyelőre egy teljesen friss Vite telepítést tartalmaz, a szükséges további függőségeket Nektek kell hozzáadni. A nem szükséges dolgokat viszont nyugodtan ki is törölheted!

```
cd client
npm install
npm run dev
```

## **REST API**

A szerver forráskódja a rest-api mappában található. Telepíteni és indítani kell lokálisan:

```
cd rest-api
npm install
npm run migrate (csak első indításnál szükséges)
npm run dev (fejlesztői kiszolgáló futtatása)
```
Négy szolgáltatás van kivezetve:

- users
- experiences
- jobs
- applicants

A végpontok leírását és kipróbálását úgy tehetitek meg legegyszerűbben, ha az alábbi Postman gyűjteményt importáljátok a Postman REST API kliensbe. Ez egy webes alkalmazás, a Postman Agentet lokálisan telepíteni kell, majd a megnyíló alkalmazásban egy új Workspace-t kell létrehozni, és fent megnyomni az "Import" gombot, és egyesével linkként beilleszteni őket:

[Minden szolgáltatás elérhető ezt a linket beillesztve](https://api.postman.com/collections/15151253-f98c9d58-a8e9-4cb4-a4c2-ba0ade3caaac?access_key=PMAT-01HXH44ZMB65PBYGK0W7WQCJSJ)


Ha el van indítva a rest-api, kipróbálhatók a végpontok. A felküldendő tartalmak a Body részben vannak előkészítve.

### users
#### register
A végpont segítségével egy felhasználót regisztrálhatunk.
A `role` mező beállításával határozható meg a regisztráció típusa. (`company`: munkáltató, `jobseeker`: munkavállaló)
#### authenticate
A végpont segítségével egy felhasználó autentikációs adatait elküldve egy `accessToken`-t kapunk vissza, amely segítségével elérhetjük azokat a végpontokat, amelyek csak bejelentkezés után érhetőek el.
#### user info
A végpont segítségével hitelesítés után lekérhetőek egy felhasználó adatai. A végpont használatához a felhasználó egyedi azonosítóját szükséges megadni.

### experiences
#### Munkavállalóként bejelentkezve:
#### get user experiences
A végpont segítségével a bejelentkezett felhasználó korábbi tapasztalai kérhetőek le.

#### add (multiple) experience
A végpont segítségével hozzáadható egy vagy több korábbi munkatapasztalat. Ehhez a megadott formátumú objektumnak, illetve objektumok listájának elküldése szükséges.

#### modify experience
A végpont segítségével korábban felvett munkatapasztalatokat módosíthatunk az adott tapasztalat egyedi azonosítójának használatával.

#### delete experience (delete all experiences)
Törlés kérés segítségével a végponton keresztül törölhetünk egy vagy több hozzáadott munkatapasztalatot.

### jobs

####  all jobs
A végpont segítségével lekérhető az összes álláshirdetés (bejelentkezés nélkül is).

Az álláshirdetések szűrése query paramétereken keresztül történik.

(például: `?userId=1&salaryFrom[$gt]=350000&company[$like]=%miff%`)

#### Munkáltatóként bejelentkezve:

#### create job
A végpontra elküldhetünk egy álláshirdetést, hogy hozzáadjunk egy újat.

#### modify job
A végpont segítségével módosíthatunk egy álláshirdetést. A módosításhoz az álláshirdetés egyedi azonosítóját megadva kell elküldenünk az új adatokat.

#### delete job (delete all jobs)
A végponton keresztül törölhetünk egy álláshirdetést, vagy kitörölhetjük az összeset.

### applicants

#### apply for a job
Munkáltatóként bejelentkezve a végpont segítségével jelentkezhetünk egy álláshirdetésre. A kérés törzsében határozható meg az állás, amelyre a bejelentkezett felhasználóval jelentkezhetünk.

#### remove application from a job
Munkáltatóként bejelentkezve a végpont segítségével visszavonhatjuk az állásjelentkezésünket.

#### applicants for a job / jobs for an applicant
Munkáltatóként lekérhetjük az álláshirdetésünkre jelentkezett felhasználókat, munkavállalóként pedig lekérhető a bejelentkezett felhasználó összes állásjelentkezése.

## **Adatbázis**

A mentett adatok egy lokális SQLite táblában jelennek meg: `rest-api.sqlite`. Ezt pl. a [DB Browser for SQLite](https://sqlitebrowser.org/) programmal tudunk megnézni, módosítani.

## **További információk**

Elvárás az igényes megjelenés. Ehhez használhatsz saját CSS-t is, de komponens függvénykönyvárakat is, mint pl. [DaisyUI](https://daisyui.com/), [shadcn/ui](https://ui.shadcn.com/), [Material UI](https://mui.com/) vagy [Bootstrap](https://react-bootstrap.github.io/).

## **Feltöltendő**

Az egész projektet tömörítsd be, kliensestül, szerverestül, és azt töltsd föl. **Beadás (tömörítés) előtt a `node_modules` mappákat(!) mindenképpen töröld!**

Az elkészült program beadása a Canvasen történik, és két dolgot kell ide feltöltenetek. Erre azért van szükség, hogy megkönnyítsétek a gyakorlatvezetőitek dolgát, és a linket megtekintve ki tudják próbálni a projekteteket. Ne feledjétek, hogy a határidő fix, ezzel késni nem tudtok!

1. StackBlitz - [https://stackblitz.com/](https://stackblitz.com/) Hozzatok létre egy új projektet itt, vagy kössétek össze a GitHub repotokkal, és készítsetek egy megosztható linket a projektből, úgy, hogy csak a linkkel lehessen elérni azt. Ne publikáljátok, hiszen akkor megvan az esély arra, hogy más rátalál a projektetekre, és ilyenkor kódegyezés esetén ezt nem fogjuk tudni kinyomozni.
2. Fájlok feltöltése tömörített mappaként. Beadás előtt a `node_modules` mappa törlendő! Beadás előtt próbáljátok ki, hogy az alábbi utasításokkal működik:

## **Pontozás**

- [x] Ennek a README.md fájlnak a  kitöltése. (kötelező)
- [ ] React használata (kötelező)
- [ ] Redux használata (kötelező)
- [ ] Navigáció: Navigáció megfelelően változik a be- és kijelentkezésnek megfelelően (1pt)
- [ ] Navigáció: Az oldal kezeli, hogy munkáltatóként vagy munkavállalóként jelentkezünk be, más más navigációt jelenít meg (1pt)
- [ ] Főoldal: A Főoldal megjelenik a keresővel (1pt)
- [ ] Főoldal: Az oldalon kilistázza a meghirdetett állásokat (1pt)
- [ ] Főoldal: Az oldalon lehet szűrni az állásokra (2pt)
- [ ] Főoldal: Az állásokra kattintva átvisz minket az alkalmazás az álláshirdetés részletező oldalára, ahol az ahhoz tartozó adatok jelennek meg (2pt)
- [ ] Regisztráció: A regisztráció működik (1pt)
- [ ] Regisztráció: A felhasználó munkavállalóként és munkáltatóként is regisztrálhat, különböző mezők jelennek meg a leendő fiók típusától függően (3pt)
- [ ] Regisztráció: Munkavállaló regisztráció esetén a felhasználó meg tudja adni a tapasztalatait (2pt)
- [ ] Bejelentkezés: Bejelentkezés működik (1pt)
- [ ] Munkavállaló - Profilom: Látszódnak a munkavállaló adatai (név, email cím), és az oldalon kilistázza az előző munkahelyeket (1pt)
- [ ] Munkavállaló - Profilom: A korábban hozzáadott munkatapasztalatok szerkeszthetőek (1pt)
- [ ] Munkavállaló - Álláshirdetések oldala: A gomb megjelenik, amivel az állásra tudunk jelentkezni. Sikeres kérés esetén a felhasználó számára megjelenik egy üzenet a sikeres jelentkezésről (1 pont)
- [ ] Munkáltató - Navigáció: Kizárólag bejelentkezett munkáltató esetén jelenik meg az álláshirdetés hozzáadása opció (1pt)
- [ ] Munkáltató - Profilom: Listázásra kerülnek a hozzáadott álláshirdetések, az egyes listaelemek mellett a szerkesztés, törlés és megtekintés opciók, megjelenik a “Hozzáadás” gomb (2pt)
- [ ] Munkáltató - Profilom: A megtekintés gomb hatására a felhasználó számára listázásra kerülnek az adott hirdetésre jelentkezett munkavállalók (1pt)
- [ ] Munkáltató - Profilom: Álláshirdetés törlése működik (1pt)
- [ ] Munkáltató - Álláshirdetés hozzáadása: Álláshirdetés hozzáadása működik (2pt)
- [ ] Munkáltató - Profilom: Álláshirdetés szerkesztése működik (2pt)
- [ ] Profilom: Kijelentkezés gomb működik(1pt)
- [ ] Igényes megjelenés (2pt)

Összesen: 30 pont (Minimum: 12 pont)

- [ ] Plusz feladat: az álláshirdetések listája infinite-scrollinggal jelenik meg (+2pt)
- [ ] Plusz feladat: az álláshirdetések létrehozásánál a munkáltató egy range-sliderrel tudja megadni a fizetés minimum és maximum értékét (+2pt)
- [ ] Plusz feladat: Modalban jelenik meg az oldal valamely része (vagy az álláshirdetés leírása, vagy a az álláshirdetésre jelentkező emberek listája, akár a profiljai) (+1pt)
