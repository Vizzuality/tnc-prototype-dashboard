import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';

import { CO_BENEFITS_ICONS } from 'containers/projects/constants';
import Wrapper from 'containers/wrapper';

import Icon from 'components/icon';
import { PROJECTS } from 'data/projects';
import { type PageQuery } from 'types/query';

const ProjectDetail = (): JSX.Element => {
  const { query } = useRouter();
  const { pid } = query as PageQuery;

  const projectData = PROJECTS.find((p) => `${p.id}` === pid);

  return (
    <>
      <Wrapper>
        <div className="flex w-2/3 flex-col items-start pt-6 pb-16">
          <Link href="/projects" className="flex items-center space-x-2 pb-8">
            <HiArrowNarrowLeft className="fill-butternut" size={30} />
            <p className="font-sans text-xl font-medium text-butternut">Back to projects</p>
          </Link>
          <div className="flex flex-col items-center">
            <h2 className="mb-16 max-w-3xl font-serif text-[35px] font-medium leading-9 text-indigo">
              {projectData?.long_title}
            </h2>
            <div className="flex space-x-20 font-sans">
              <div className="flex flex-col items-center">
                <p className="pb-2 text-4xl font-bold text-spring">
                  {projectData?.carbon_mitigation}
                </p>
                <div className="flex flex-col items-center text-[17px] font-medium leading-6 text-text">
                  <p>Tons of Carbon</p>
                  <p>Mitigation Potential</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="pb-2 text-4xl font-bold text-spring">
                  {projectData?.hectares_impacted}
                </p>
                <p className="text-[17px] font-medium text-text">Hectares Impacted</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="pb-2 text-4xl font-bold text-spring">
                  {projectData?.people_supported}
                </p>
                <p className="text-[17px] font-medium text-text">People Supported</p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <Wrapper>
        <div className="flex justify-between border-t py-4 text-text ">
          <a className="hover:text-butternut" href="#goals">
            Overview
          </a>
          <a className="hover:text-butternut" href="#why">
            Why This, Why Now
          </a>
          <a className="hover:text-butternut" href="#lessons">
            Lessons Learned
          </a>
          <a className="hover:text-butternut" href="#science">
            Science
          </a>
          <a className="hover:text-butternut" href="#co-benefits">
            Co-benefits
          </a>
          <a className="hover:text-butternut" href="#contact">
            Contact
          </a>
        </div>
      </Wrapper>
      <section id="goals" className="flex">
        <div className="flex w-1/2 justify-end bg-indigo">
          <div className="flex flex-col space-y-3 p-20 text-white">
            <h4 className="font-serif text-4xl font-medium">Goals</h4>
            <p className="max-w-xl font-sans text-xl leading-9">{projectData?.project_goal}</p>
          </div>
        </div>
        <Image
          src="/images/home/lessons/logistics.png"
          alt="Goals"
          height={300}
          width={600}
          style={{ objectFit: 'cover' }}
          className="w-1/2"
        />
      </section>
      <section id="why" className="bg-gradient-to-r from-midnight via-indigo to-midnight">
        <Wrapper>
          <div className="flex flex-col items-center space-y-4 py-16 text-white">
            <h4 className="pb-2 font-serif text-3xl font-medium">Why This, Why Now</h4>
            <p className="max-w-3xl text-center font-sans text-xl leading-9">
              {projectData?.why_content}
            </p>
          </div>
        </Wrapper>
      </section>
      <section id="lessons">
        <div className="bg-indigo py-6">
          <Wrapper>
            <div>
              <h4 className="font-serif text-3xl font-medium text-white">Lessons Learned</h4>
            </div>
          </Wrapper>
        </div>
        <Wrapper>
          <table>
            <tbody>
              <tr className="border-b-[2px] [&>*]:py-10">
                <td className="w-1/4 font-serif text-2xl font-medium text-indigo">
                  {projectData?.lesson_1_category}
                </td>
                <td className="w-3/4 px-20 font-sans text-[17px] leading-6 text-text">
                  {projectData?.lesson_1}
                </td>
              </tr>
              <tr className="border-b-[2px] [&>*]:py-10">
                <td className="w-1/4 pr-10 font-serif text-2xl font-medium text-indigo">
                  {projectData?.lesson_2_category}
                </td>
                <td className="w-3/4 px-20 font-sans text-[17px] leading-6 text-text">
                  {projectData?.lesson_2}
                </td>
              </tr>
              <tr className="[&>*]:py-10">
                <td className="w-1/4 font-serif text-2xl font-medium text-indigo">
                  {projectData?.lesson_3_category}
                </td>
                <td className="w-3/4 px-20 font-sans text-[17px] leading-6 text-text">
                  {projectData?.lesson_3}
                </td>
              </tr>
            </tbody>
          </table>
        </Wrapper>
      </section>
      <section id="science" className="flex flex-col">
        <div className="bg-indigo py-6">
          <Wrapper>
            <div>
              <h4 className="font-serif text-3xl font-medium text-white">Science</h4>
            </div>
          </Wrapper>
        </div>
        <Wrapper>
          <div className="flex w-3/4 flex-col space-y-6 py-16">
            <p className="font-serif text-2xl font-medium text-indigo">Research Summary</p>
            <p className="font-sans text-[17px] leading-6 text-text">
              {projectData?.project_summary}
            </p>
          </div>
        </Wrapper>
      </section>
      <section id="co-benefits" className="flex flex-col">
        <div className="bg-indigo py-6">
          <Wrapper>
            <div>
              <h4 className="font-serif text-3xl font-medium text-white">Co-Benefits</h4>
            </div>
          </Wrapper>
        </div>
        <Wrapper>
          <div className="py-16">
            {projectData?.cb_biodiversity && (
              <div className="flex flex-col space-y-2 py-6 font-sans text-text">
                <div className="flex">
                  <Icon icon={CO_BENEFITS_ICONS.Biodiversity} className="h-7 w-7" />
                  <p className="text-xl font-light">Biodiversity</p>
                </div>
                <p className="text-[17px] leading-6">{projectData?.cb_biodiversity}</p>
              </div>
            )}
            {projectData?.cb_ecosystem_services && (
              <div className="flex flex-col space-y-2 py-6 font-sans text-text">
                <div className="flex">
                  <Icon icon={CO_BENEFITS_ICONS.EcosystemServices} className="h-7 w-7" />
                  <p className="text-xl font-light">Ecosystem Services</p>
                </div>
                <p className="text-[17px] leading-6">{projectData?.cb_ecosystem_services}</p>
              </div>
            )}
            {projectData?.cb_livelihood_econ && (
              <div className="flex flex-col space-y-2 py-6 font-sans text-text">
                <div className="flex">
                  <Icon icon={CO_BENEFITS_ICONS.ReslienceAndAdaptation} className="h-7 w-7" />
                  <p className="text-xl font-light">Livelihoods & Economics</p>
                </div>
                <p className="text-[17px] leading-6">{projectData?.cb_livelihood_econ}</p>
              </div>
            )}
            {projectData?.cb_health_well_being && (
              <div className="flex flex-col space-y-2 py-6 font-sans text-text">
                <div className="flex">
                  <Icon icon={CO_BENEFITS_ICONS.HumanHealthWellBeing} className="h-7 w-7" />
                  <p className="text-xl font-light">Health & Well-being</p>
                </div>
                <p className="text-[17px] leading-6">{projectData?.cb_health_well_being}</p>
              </div>
            )}
            {projectData?.cb_resilience_adapt && (
              <div className="flex flex-col space-y-2 py-6 font-sans text-text">
                <div className="flex">
                  <Icon icon={CO_BENEFITS_ICONS.LivelihoodsEconomic} className="h-7 w-7" />
                  <p className="text-xl font-light">Resilience & Adaptation</p>
                </div>
                <p className="text-[17px] leading-6">{projectData?.cb_resilience_adapt}</p>
              </div>
            )}
          </div>
        </Wrapper>
      </section>
      <section>
        <Wrapper>
          <div className="space-y-4 border-t-[2px] py-8">
            <h4 className="font-serif text-3xl font-medium text-indigo">Partners</h4>
            <div className="flex flex-wrap font-light leading-8 text-text">
              {projectData?.primary_partners.split(/[,]+/).map((partner) => (
                <p key={partner} className="mr-8">
                  {partner}
                </p>
              ))}
            </div>
          </div>
        </Wrapper>
      </section>
      <section className="bg-gradient-to-r from-midnight via-indigo to-midnight">
        <Wrapper>
          <div className="flex justify-center py-20">
            <p className="max-w-3xl text-center font-sans text-xl font-light leading-7 text-white">
              {projectData?.callout}
            </p>
          </div>
        </Wrapper>
      </section>
      <section id="contact" className="bg-gradient-to-r from-midnight via-indigo to-midnight">
        <Wrapper>
          <div className="flex flex-col items-center space-y-4 py-16 font-sans text-white">
            <p className="text-2xl">WANT MORE INFORMATION?</p>
            <p className="text-center text-[17px]">
              Reach out and we’ll connect you to the people who will be the most helpful for your
              questions.
            </p>
            <Link href="/contact">
              <button className="mt-6 inline-flex h-14 items-center space-x-6 rounded-none bg-butternut px-7 text-white transition-colors hover:bg-background hover:text-butternut">
                <p className="text-base font-bold uppercase">Contact us</p>
                <HiArrowNarrowRight className="stroke-white hover:stroke-butternut" size={20} />
              </button>
            </Link>
          </div>
        </Wrapper>
      </section>
    </>
  );
};

export default ProjectDetail;