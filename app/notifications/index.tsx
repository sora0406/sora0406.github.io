/**
 * 通知系統模組
 * 
 * 本模組提供應用程式中所有通知相關功能，包括電子郵件模板、消息格式化等。
 */

import { emailTemplates, templateVariables } from "./email-templates";

/**
 * 格式化模板
 * 將模板字串中的變數替換為實際值
 * 
 * @param template 模板字串
 * @param variables 變數對象
 * @returns 格式化後的字串
 */
export const formatTemplate = (template: string, variables: Record<string, string | number>): string => {
  return template.replace(/{(\w+)}/g, (match, key) => {
    return variables[key] !== undefined ? String(variables[key]) : match;
  });
};

/**
 * 獲取電子郵件模板
 * 
 * @param templateKey 模板鍵名
 * @param language 語言 (zh 或 en)
 * @returns 電子郵件模板對象，包含標題和內容
 */
export const getEmailTemplate = (templateKey: keyof typeof emailTemplates, language: 'zh' | 'en' = 'zh') => {
  const template = emailTemplates[templateKey];
  if (!template) {
    throw new Error(`Template "${templateKey}" not found.`);
  }
  
  return template[language];
};

/**
 * 準備電子郵件內容
 * 
 * @param templateKey 模板鍵名
 * @param language 語言 (zh 或 en)
 * @param variables 變數對象
 * @returns 格式化後的電子郵件對象，包含標題和內容
 */
export const prepareEmail = (
  templateKey: keyof typeof emailTemplates, 
  variables: Record<string, string | number>, 
  language: 'zh' | 'en' = 'zh'
) => {
  const template = getEmailTemplate(templateKey, language);
  
  return {
    subject: formatTemplate(template.subject, variables),
    body: formatTemplate(template.body, variables)
  };
};

/**
 * 獲取所有可用的電子郵件模板
 * 
 * @returns 所有電子郵件模板的鍵名
 */
export const getAvailableTemplates = () => {
  return Object.keys(emailTemplates) as Array<keyof typeof emailTemplates>;
};

/**
 * 獲取模板所需變數
 * 
 * @param templateKey 模板鍵名
 * @returns 模板所需的變數列表
 */
export const getTemplateVariables = (templateKey: keyof typeof emailTemplates) => {
  return [
    ...templateVariables.common,
    ...(templateVariables[templateKey] || [])
  ];
};

// 導出模板和變數
export { emailTemplates, templateVariables };

// 使用示例
/*
import { prepareEmail, getTemplateVariables } from '@/app/notifications';

// 獲取模板所需變數
const variables = getTemplateVariables('supplierDataRequest');
console.log('Required variables:', variables);

// 準備電子郵件
const emailData = {
  supplierName: '台積電股份有限公司',
  companyName: '永續科技股份有限公司',
  requestTitle: '2023年度碳排放數據收集',
  dueDate: '2023-12-31',
  priority: '高',
  description: '請提供貴公司2023年度碳排放相關數據...',
  contactPerson: '王小明',
  contactEmail: 'contact@example.com',
  requesterName: '林經理',
  formLink: 'https://example.com/form/123'
};

const email = prepareEmail('supplierDataRequest', emailData, 'zh');
console.log('Email Subject:', email.subject);
console.log('Email Body:', email.body);
*/ 