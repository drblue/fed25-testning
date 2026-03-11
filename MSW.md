# MSW i `lesson-5` (integrationstester)

Det här dokumentet förklarar vad **MSW (Mock Service Worker)** är, varför det infördes i `lesson-5`, och exakt vilka ändringar som gjordes i projektet.

## Kort förklaring: vad är MSW?

**MSW** är ett verktyg som fångar upp HTTP-anrop (GET, POST, PATCH, DELETE) och låter oss returnera fejkade svar i tester.

I praktiken betyder det att:
- frontend-koden körs som vanligt (t.ex. `TodoAPI.ts` med `axios`),
- men nätverksanropen fångas upp av MSW i stället för att gå till en riktig backend,
- så testerna blir snabbare, stabilare och oberoende av om backend är igång.

## Varför bytte vi till MSW i `lesson-5`?

Före `lesson-5` behövde testerna städa upp mot en riktig API-databas mellan testfall (skapa/radera data). Det gav:
- beroende av extern miljö,
- mer komplex setup/teardown,
- större risk för flakiga tester.

I `lesson-5` mockas API:et i testmiljön med MSW. Då testar vi fortfarande vår API-klient (`TodoAPI`) och dess logik, men utan extern backend.

## Exakta ändringar i `lesson-5`

Jämfört med `lesson-4` ändrades följande i `03-integration-testing/frontend`:

1. `package.json`
- `msw` lades till i `devDependencies`.

2. `src/mocks/server.ts` (ny fil)
- Skapar en MSW-server med `setupServer(...handlers)` för Node/Vitest.

3. `src/mocks/handlers.ts` (ny fil)
- Definierar mockade endpoints för todos:
  - `GET /todos`
  - `GET /todos/:todoId`
  - `POST /todos`
  - `PATCH /todos/:todoId`
  - `DELETE /todos/:todoId`
- Har en intern `dummyTodos`-array som fungerar som testdata.

4. `src/tests/TodoAPI.test.ts`
- Importerar `server` från `../mocks/server`.
- Lägger till test-livscykel:
  - `beforeAll(() => server.listen())`
  - `afterEach(() => server.resetHandlers())`
  - `afterAll(() => server.close())`
- Tar bort tidigare cleanup mot riktig backend (som raderade todos före/efter tester).
- Testet `"should return a empty list"` kontrollerar nu bara att svaret är en array, inte längd `0`, eftersom mockdata startar med tre todos.

## Hur flödet fungerar i testkörning

1. `beforeAll` startar MSW-servern.
2. Ett test anropar t.ex. `TodoAPI.getTodos()`.
3. `axios` försöker göra `GET http://localhost:3001/todos`.
4. MSW fångar anropet och svarar från `handlers.ts` med `dummyTodos`.
5. `afterEach` återställer eventuella tillfälliga handler-överskrivningar.
6. `afterAll` stänger MSW-servern.

## Viktig observation för studenter

`TodoAPI.ts` är oförändrad och tror fortfarande att den pratar med en riktig backend via `BASE_URL`.

Det är poängen med MSW:
- vi testar applikationskod så realistiskt som möjligt,
- men kontrollerar nätverkslagret helt i testmiljön.

## När är MSW extra bra?

MSW är särskilt bra när ni vill:
- testa felhantering (t.ex. 404/500) utan att manipulera en riktig server,
- skriva deterministiska integrationstester,
- undvika långsam och skör testsetup.

## Sammanfattning

`lesson-5` introducerar MSW för att mocka API-anrop i integrationstester. Resultatet är enklare setup, stabilare tester och bättre kontroll över testdata, samtidigt som ni fortfarande testar samma `TodoAPI`-kod som används i appen.
