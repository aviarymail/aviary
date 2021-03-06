const { readFileSync, readdirSync } = require('fs');
const { resolve } = require('path');
const fastify = require('fastify');
const hbs = require('handlebars');

const server = fastify();

server.register(require('fastify-static'), {
  root: resolve(__dirname, '..', 'build'),
  prefix: '/assets',
});

server.get('/', (req, reply) => {
  const stories = readdirSync(resolve(__dirname, 'stories')).map(file => {
    const name = file.replace('.json', '');
    return `
      <li>
        <a href="/stories/${name}" class="text-white text-sm capitalize hover:underline">
          ${name.replace(/-/g, ' ')}
        </a>
      </li>
    `;
  });
  const examples = readdirSync(resolve(__dirname, 'examples')).map(file => {
    const name = file.replace('.json', '');
    return `
      <li>
        <a href="/examples/${name}" class="text-white text-sm capitalize hover:underline">
          ${name.replace(/-/g, ' ')}
        </a>
      </li>
    `;
  });

  reply.type('text/html').send(
    html(`
      <ul class="ml-20">
        ${stories.join('')}
      </ul>
      <ul class="ml-20">
        ${examples.join('')}
      </ul>
    `)
  );
});

server.get('/:block', (req, reply) => {
  const rendered = block(req.params.block);

  reply.type('text/html').send(
    html(`
      <a href="/" class="text-white top-5 left-5 absolute">Back</a>
      <div class="bg-white rounded shadow-2xl w-[960px]">
        ${rendered}
      </div>
    `)
  );
});

server.get('/examples/:example', (req, reply) => {
  const json = example(req.params.example);
  const rendered = json.blocks.map(b => block(b.block, b.data));

  reply.type('text/html').send(
    html(`
      <a href="/" class="text-white top-5 left-5 absolute">Back</a>
      <div class="bg-white rounded shadow-2xl w-[960px]">
        ${rendered.join('')}
      </div>
    `)
  );
});

server.get('/stories/:story', (req, reply) => {
  const json = story(req.params.story);
  const rendered = json.blocks.map(b => block(b.block, b.data));

  reply.type('text/html').send(
    html(`
      <a href="/" class="text-white top-5 left-5 absolute">Back</a>
      <div class="bg-white rounded shadow-2xl w-[960px]">
        ${rendered.join('')}
      </div>
    `)
  );
});

function html(body) {
  return `
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="x-apple-disable-message-reformatting">
        <title></title>
        <!--[if mso]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
        <style>
          table {border-collapse: collapse;}
          td,th,div,p,a {font-size: 16px; line-height: 26px;}
          .spacer,.divider,div,p,a,h1,h2,h3,h4,h5,h6 {mso-line-height-rule: exactly;}
          td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family:"Segoe UI",Helvetica,Arial,sans-serif;}
        </style>
        <![endif]-->

        <style type="text/css">
          #outlook a {padding: 0;}
          img {border: 0; line-height: 100%; vertical-align: middle;}
          table, td, tr { padding: 0 }
        </style>

        <link rel="stylesheet" href="/assets/styles.css">
      </head>
      <body class="flex bg-gray-900 items-center justify-center">
        ${body}
      </body>
    </html>
    `;
}

readdirSync(resolve(__dirname, 'partials')).forEach(name => {
  name = name.replace('.hbs', '');
  const file = readFileSync(resolve(__dirname, `partials/${name}.hbs`), 'utf8');
  hbs.registerPartial(name, file);
});

readdirSync(resolve(__dirname, 'blocks')).forEach(name => {
  name = name.replace('.hbs', '');
  const file = readFileSync(resolve(__dirname, `blocks/${name}.hbs`), 'utf8');
  hbs.registerPartial(name, file);
});

server.listen(3000, err => {
  if (err) throw err;
  console.log(`server listening on ${server.server.address().port}`);
});

function block(name, d) {
  name = name.replace('.hbs', '');
  const file = readFileSync(resolve(__dirname, `blocks/${name}.hbs`), 'utf8');
  const preflight = hbs.compile(file)({});
  return hbs.compile(preflight)(d || {});
}

function example(name) {
  try {
    const file = readFileSync(resolve(__dirname, `examples/${name}.json`), 'utf8');
    return JSON.parse(file);
  } catch {
    return {};
  }
}

function story(name) {
  try {
    const file = readFileSync(resolve(__dirname, `stories/${name}.json`), 'utf8');
    return JSON.parse(file);
  } catch {
    return {};
  }
}
