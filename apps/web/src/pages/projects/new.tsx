import { Title } from 'solid-meta';
import { object, output, string } from 'zod';
import { ColorInput } from '~/components/base/color-input';
import { createForm } from '~/hooks/create-form';

const schema = object({
  name: string(),
  containerBgColor: string(),
  containerTextColor: string(),
  bodyBgColor: string(),
  bodyTextColor: string(),
});

export default function ProjectsNew() {
  const { form, data, setField } = createForm<output<typeof schema>>({
    schema,
    initialValues: {
      name: '',
      containerBgColor: '#11151F',
      containerTextColor: '#ffffff',
      bodyBgColor: '#ffffff',
      bodyTextColor: '#000000',
    },
    onSubmit(values) {
      console.log(values);
    },
  });

  return (
    <>
      <Title>New Project</Title>

      <main className="container mx-auto">
        <div className="text-lg font-bold">
          <input name="name" placeholder="Project Name" className="text-xl font-bold" autofocus />
        </div>

        <form use:form className="flex mt-10">
          <div className="w-1/2">
            <h2 className="text-xs uppercase mb-10 font-bold">Settings</h2>

            <div className="flex">
              <div className="w-1/2 space-y-5">
                <ColorInput
                  name="containerBgColor"
                  label="Container Background Color"
                  value={data.containerBgColor}
                  onColorChange={color => setField('containerBgColor', color)}
                />

                <ColorInput
                  name="containerTextColor"
                  label="Container Text Color"
                  value={data.containerTextColor}
                  onColorChange={color => setField('containerTextColor', color)}
                />
              </div>
              <div className="w-1/2 ml-10 space-y-5">
                <ColorInput
                  name="bodyBgColor"
                  label="Body Background Color"
                  value={data.bodyBgColor}
                  onColorChange={color => setField('bodyBgColor', color)}
                />

                <ColorInput
                  name="bodyTextColor"
                  label="Body Text Color"
                  value={data.bodyTextColor}
                  onColorChange={color => setField('bodyTextColor', color)}
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 ml-20">
            <h2 className="text-xs uppercase mb-10 font-bold">Preview</h2>
            <svg
              className="w-full rounded"
              fill="none"
              viewBox="0 0 320 320"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill={data.containerBgColor} d="M0 0h320v320H0z" />
              <path fill={data.containerTextColor} d="M135 32h51v11h-51z" />
              <rect x="50" y="60" width="220" height="219" rx="5" fill={data.bodyBgColor} />
              <g fill={data.bodyTextColor}>
                <path d="M75 92h41v10H75zM125 92h41v10h-41zM175 92h61v10h-61zM75 112h61v10H75zM75 212h61v11H75zM75 162h21v2H75zM105 162h21v2h-21zM135 162h51v2h-51zM195 162h31v2h-31zM75 172h41v2H75zM125 172h21v2h-21zM155 172h51v2h-51zM145 112h41v10h-41z" />
              </g>
            </svg>
          </div>
        </form>
      </main>
    </>
  );
}
