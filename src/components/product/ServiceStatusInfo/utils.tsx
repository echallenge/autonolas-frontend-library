import React, { Fragment } from 'react';
import { Typography } from 'antd';
import { LinkType, LinksSectionType, EachLink } from './types';

const { Text } = Typography;

const PROPEL_URL = 'https://propel.valory.xyz';
const DOCS_LINK = 'https://docs.autonolas.network/product';
const ML_KIT_DOCS = `${DOCS_LINK}/mlkit/`;
const ORACLE_KIT_DOCS = `${DOCS_LINK}/oraclekit/`;
const MINT_KIT_DOCS = `${DOCS_LINK}/mintkit/`;
const COORDTINATION_KIT_URL = `${DOCS_LINK}/coordinationkit/`;

export const DotSpace = () => <>&nbsp;&nbsp;•&nbsp;&nbsp;</>;

const isGoerli = () => {
  // on server side, window is undefined.
  if (typeof window === 'undefined') return false;
  return Number((window as any)?.MODAL_PROVIDER?.chainId || 1) === 5;
};

const LINKS: LinkType = {
  mintkit: {
    kit: { link: MINT_KIT_DOCS, name: 'MINTKIT' },
    largeBuiltWith: [
      { text: 'Run the Code', redirectTo: `${MINT_KIT_DOCS}#demo` },
      { text: 'Get help building', redirectTo: PROPEL_URL, isInternal: false },
    ],
    midBuiltWith: [
      { text: 'Run demo code', redirectTo: `${MINT_KIT_DOCS}#demo` },
      { text: 'Get help', redirectTo: PROPEL_URL, isInternal: false },
    ],
  },
  oraclekit: {
    kit: { link: ORACLE_KIT_DOCS, name: 'ORACLEKIT' },
    largeBuiltWith: [
      { text: 'Run demo code', redirectTo: `${ORACLE_KIT_DOCS}#demo` },
      { text: 'Get help building', redirectTo: PROPEL_URL, isInternal: false },
    ],
    midBuiltWith: [
      { text: 'Run demo code', redirectTo: `${ORACLE_KIT_DOCS}#demo` },
      { text: 'Get help', redirectTo: PROPEL_URL, isInternal: false },
    ],
  },
  mlkit: {
    kit: { link: ML_KIT_DOCS, name: 'MLKIT' },
    largeBuiltWith: [
      { text: 'Run demo code', redirectTo: `${ML_KIT_DOCS}#demo` },
      { text: 'Get help building', redirectTo: PROPEL_URL, isInternal: false },
    ],
    midBuiltWith: [
      { text: 'Run demo code', redirectTo: `${ML_KIT_DOCS}#demo` },
      { text: 'Get help', redirectTo: PROPEL_URL, isInternal: false },
    ],
  },
  contributionkit: {
    kit: { link: COORDTINATION_KIT_URL, name: 'CONTRIBUTIONKIT' },
    largeBuiltWith: [
      { text: 'Run demo code', redirectTo: `${COORDTINATION_KIT_URL}#demo` },
      { text: 'Get help building', redirectTo: PROPEL_URL, isInternal: false },
    ],
    midBuiltWith: [
      { text: 'Run demo code', redirectTo: `${COORDTINATION_KIT_URL}#demo` },
      { text: 'Get help', redirectTo: PROPEL_URL, isInternal: false },
    ],
    docs: [
      {
        text: 'Live service',
        redirectTo: 'https://protocol.autonolas.network/services',
      },
      {
        text: 'Service code',
        redirectTo: 'https://github.com/valory-xyz/contribution-service',
        isInternal: false,
      },
      {
        text: 'Contracts',
        redirectTo: isGoerli()
          ? 'https://goerli.etherscan.io/address/0x7C3B976434faE9986050B26089649D9f63314BD8'
          : 'https://etherscan.io/address/0x02c26437b292d86c5f4f21bbcce0771948274f84',
        isInternal: false,
      },
    ],
  },
};

const getList = (contents?: EachLink[]) =>
  (contents || []).map(({ text, redirectTo, isInternal = true }, index) => (
    <Fragment key={`link-${redirectTo}`}>
      <Text type="secondary">
        {redirectTo ? (
          <a
            href={redirectTo}
            target={isInternal ? '_self' : '_blank'}
            rel="noreferrer"
          >
            {text}
          </a>
        ) : (
          <>{`${text} (link coming soon)`}</>
        )}

        {index !== (contents || []).length - 1 && (
          <>&nbsp;&nbsp;•&nbsp;&nbsp;</>
        )}
      </Text>
    </Fragment>
  ));

export const LinksSection = ({ appType, isMidSize }: LinksSectionType) => {
  // if no appType, return null
  if (!appType) return null;

  // for mid-size
  if (isMidSize) return <>{getList(LINKS[appType].midBuiltWith)}</>;

  return (
    <>
      {[
        {
          id: 'docs',
          list: LINKS[appType].largeBuiltWith,
          name: (
            <>
              BUILT WITH&nbsp;
              <a href={LINKS[appType].kit.link} rel="noreferrer">
                {LINKS[appType].kit.name || ''}
              </a>
            </>
          ),
        },
        { id: 'code', name: 'CODE', list: LINKS[appType].docs },
      ].map((e) => {
        // currently we show docs only for contributionkit
        if (e.id === 'code' && appType !== 'contributionkit') return null;

        return (
          <div key={e.id}>
            <div>
              <Text className="status-sub-header">{e.name}</Text>
            </div>

            <div className="status-sub-content">{getList(e.list)}</div>
          </div>
        );
      })}
    </>
  );
};
