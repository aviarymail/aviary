import { createSignal } from 'solid-js';
import { Title } from 'solid-meta';
import { number, object, output, string } from 'zod';
import { ColorInput } from '~/components/base/color-input';
import { TextInput } from '~/components/base/text-input';
import { createForm } from '~/hooks/create-form';

const schema = object({
  name: string(),
  logoWidth: number(),
  bodyBgColor: string(),
  headerTextColor: string(),
  footerTextColor: string(),
  containerBgColor: string(),
  textColor: string(),
  ctaBgColor: string(),
  ctaTextColor: string(),
});

export default function ProjectsNew() {
  const [showAdvanced, setShowAdvanced] = createSignal(false);
  const { form, data, setField } = createForm<output<typeof schema>>({
    schema,
    initialValues: {
      name: '',
      logoWidth: 50,
      containerBgColor: '#10338b',
      headerTextColor: '#ffffff',
      footerTextColor: '#ffffff',
      bodyBgColor: '#ffffff',
      textColor: '#000000',
      ctaBgColor: '#2288ff',
      ctaTextColor: '#ffffff',
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
          <input name="name" placeholder="Project Name" className="text-2xl font-bold" autofocus />
        </div>

        <form use:form className="flex mt-20">
          <div className="w-1/2">
            <h2 className="text-xs uppercase mb-10 font-bold">Settings</h2>

            <div className="grid grid-cols-3 gap-6">
              <TextInput type="number" name="logoWidth" label="Logo Width" value={data.logoWidth} />
            </div>

            <div className="mt-10 mb-20">
              <input
                name="showAdvanced"
                id="showAdvanced"
                type="checkbox"
                checked={showAdvanced()}
                onChange={e => setShowAdvanced(!showAdvanced())}
              />
              <label for="showAdvanced" className="ml-2">
                Show Advanced
              </label>
            </div>

            {showAdvanced() && (
              <>
                <div className="grid grid-cols-3 gap-6">
                  <ColorInput
                    name="containerBgColor"
                    label="Container BG"
                    value={data.containerBgColor}
                    onColorChange={color => setField('containerBgColor', color)}
                  />

                  <ColorInput
                    name="headerTextColor"
                    label="Header Text"
                    value={data.headerTextColor}
                    onColorChange={color => setField('headerTextColor', color)}
                  />

                  <ColorInput
                    name="footerTextColor"
                    label="Footer Text"
                    value={data.footerTextColor}
                    onColorChange={color => setField('footerTextColor', color)}
                  />
                </div>

                <h3 className="text-sm font-medium mt-12 mb-6">Body Colors</h3>
                <div className="grid grid-cols-3 gap-6">
                  <ColorInput
                    name="bodyBgColor"
                    label="Body BG"
                    value={data.bodyBgColor}
                    onColorChange={color => setField('bodyBgColor', color)}
                  />
                  <ColorInput
                    name="textColor"
                    label="Text"
                    value={data.textColor}
                    onColorChange={color => setField('textColor', color)}
                  />
                </div>

                <h3 className="text-sm font-medium mt-12 mb-6">CTA Button Colors</h3>
                <div className="grid grid-cols-3 gap-6">
                  <ColorInput
                    name="ctaTextColor"
                    label="Text"
                    value={data.ctaTextColor}
                    onColorChange={color => setField('ctaTextColor', color)}
                  />
                  <ColorInput
                    name="ctaBgColor"
                    label="Background"
                    value={data.ctaBgColor}
                    onColorChange={color => setField('ctaBgColor', color)}
                  />
                </div>
              </>
            )}
          </div>
          <div className="w-1/2 ml-20">
            <h2 className="text-xs uppercase mb-10 font-bold">Preview</h2>
            <svg
              viewBox="0 0 320 348"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
            >
              {/* email background */}
              <rect width="320" height="348" fill={data.containerBgColor} />
              {/* container background */}
              <rect x="50" y="60" width="220" height="219" rx="5" fill={data.bodyBgColor} />
              {/* header text */}
              <g fill={data.headerTextColor}>
                <rect x="195" y="31" width="21" height="2" />
                <rect x="225" y="31" width="21" height="2" />
              </g>
              {/* footer text */}
              <g fill={data.footerTextColor}>
                <rect x="105" y="306" width="21" height="2" />
                <rect x="135" y="306" width="21" height="2" />
                <rect x="165" y="306" width="51" height="2" />
                <rect x="123" y="316" width="41" height="2" />
                <rect x="173" y="316" width="21" height="2" />
              </g>
              {/* body text */}
              <g fill={data.textColor}>
                {/* headline */}
                <rect x="75" y="92" width="41" height="10" />
                <rect x="125" y="92" width="41" height="10" />
                <rect x="175" y="92" width="61" height="10" />
                <rect x="75" y="112" width="61" height="10" />
                <rect x="145" y="112" width="41" height="10" />
                {/* body */}
                <rect x="75" y="162" width="21" height="2" />
                <rect x="105" y="162" width="21" height="2" />
                <rect x="135" y="162" width="51" height="2" />
                <rect x="195" y="162" width="31" height="2" />
                <rect x="75" y="172" width="41" height="2" />
                <rect x="125" y="172" width="21" height="2" />
                <rect x="155" y="172" width="51" height="2" />
              </g>
              {/* cta bg */}
              <rect x="75" y="212" width="69" height="19" fill={data.ctaBgColor} />
              {/* cta text */}
              <g fill={data.ctaTextColor}>
                <rect x="90" y="221" width="21" height="2" />
                <rect x="118" y="221" width="9" height="2" />
              </g>
              {/* logo */}
              <rect
                x="75"
                y="24"
                width={(220 / 600) * data.logoWidth}
                height="16"
                fill={data.headerTextColor}
              />
            </svg>
          </div>
        </form>
      </main>
    </>
  );
}
