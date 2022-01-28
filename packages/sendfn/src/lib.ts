type TplNames = 'Some Name' | 'Another';

enum Tpl {
  SOME_NAME = 'Some Name',
  ANOTHER = 'Another',
}

const TplIds: Record<TplNames, string> = {
  'Some Name': '425346h2g154g164h241g3',
  Another: 'asdasdfq3fq34g1g34g14g',
};

type DataFor<T extends TplNames, U> = Record<T, U>;
type DataMap = DataFor<'Some Name', { something: string }> &
  DataFor<'Another', { something: boolean }>;

export async function send<T extends TplNames>(tpl: T, opts: { to: string; data: DataMap[T] }) {
  return fetch('https://api.aviarymail.com/send', {
    method: 'POST',
    body: JSON.stringify({
      ...opts.data,
      templateId: TplIds[tpl],
      to: opts.to,
    }),
  });
}

send('Another', {
  to: 'asd',
  data: { something: true },
});

send(Tpl.SOME_NAME, {
  to: 'dsa@asd.com',
  data: { something: 'asd' },
});
