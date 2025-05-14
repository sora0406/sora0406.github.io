/**
 * 通知信模板
 * 
 * 本檔案包含多種通知情境的電子郵件模板，包括中英文版本。
 * 每個模板都包含使用者故事、信件標題和信件內容。
 */

export const emailTemplates = {
  // 情境1：PGM通知供應商要進來填寫提供資料
  supplierDataRequest: {
    userStory: "作為專案管理人員(PGM)，我想要通知供應商填寫特定表單，以便收集必要的供應鏈數據。",
    zh: {
      subject: "【重要】請提供供應鏈數據資料 - {requestTitle}",
      body: `親愛的{supplierName}供應商：

您好！

{companyName}正在進行供應鏈數據收集，需要您提供相關資料。請協助完成以下表單：

表單名稱：{requestTitle}
截止日期：{dueDate}
重要度：{priority}

請點擊以下連結訪問並填寫表單：
{formLink}

備註說明：
{description}

若您有任何疑問，請聯繫：
{contactPerson}
{contactEmail}

感謝您的配合與支持！

此致
{requesterName}
{companyName}供應鏈管理團隊`
    },
    en: {
      subject: "[IMPORTANT] Supply Chain Data Request - {requestTitle}",
      body: `Dear {supplierName},

{companyName} is conducting supply chain data collection and requires your input. Please complete the following form:

Form Title: {requestTitle}
Due Date: {dueDate}
Priority: {priority}

Please click the link below to access and complete the form:
{formLink}

Additional Notes:
{description}

If you have any questions, please contact:
{contactPerson}
{contactEmail}

Thank you for your cooperation and support!

Best regards,
{requesterName}
{companyName} Supply Chain Management Team`
    }
  },

  // 情境2：供應商送出表單，PGM接到通知
  pgmSubmissionNotification: {
    userStory: "作為專案管理人員(PGM)，我想收到供應商提交表單的通知，以便及時查看和處理提交的資料。",
    zh: {
      subject: "【通知】供應商已提交資料 - {supplierName} - {requestTitle}",
      body: `親愛的{pgmName}：

您好！

供應商已提交了您要求的資料。以下是提交的詳細信息：

表單名稱：{requestTitle}
供應商：{supplierName} (ID: {supplierId})
提交時間：{submissionTime}
檔案數量：{fileCount}

您可以通過以下連結查看提交的資料：
{viewLink}

供應商備註：
{supplierNotes}

請在 {reviewPeriod} 天內完成審核，以確保流程順利進行。

此致
系統自動通知`
    },
    en: {
      subject: "[NOTIFICATION] Supplier Data Submission - {supplierName} - {requestTitle}",
      body: `Dear {pgmName},

A supplier has submitted the data you requested. Here are the submission details:

Form Title: {requestTitle}
Supplier: {supplierName} (ID: {supplierId})
Submission Time: {submissionTime}
Number of Files: {fileCount}

You can view the submitted data via the link below:
{viewLink}

Supplier Notes:
{supplierNotes}

Please complete your review within {reviewPeriod} days to ensure a smooth process.

Regards,
System Notification`
    }
  },

  // 情境3：供應商送出表單，供應商本人收到回應通知
  supplierSubmissionConfirmation: {
    userStory: "作為供應商，我想在提交表單後收到確認通知，以便了解我的提交狀態並保留編輯選項。",
    zh: {
      subject: "【確認】您已成功提交資料 - {requestTitle}",
      body: `親愛的{supplierContactName}：

感謝您提交{requestTitle}的相關資料。

提交詳情：
提交時間：{submissionTime}
提交表單：{requestTitle}
檔案數量：{fileCount}

您提交的資料將由{companyName}團隊審核。您可以隨時通過以下連結查看或編輯您的提交內容（截止日期前）：
{editLink}

提交的檔案：
{fileList}

如需協助，請聯繫：
{contactEmail}

感謝您的合作！

此致
{companyName}供應鏈管理團隊`
    },
    en: {
      subject: "[CONFIRMATION] Your Data Submission - {requestTitle}",
      body: `Dear {supplierContactName},

Thank you for submitting your data for {requestTitle}.

Submission Details:
Submission Time: {submissionTime}
Form Title: {requestTitle}
Number of Files: {fileCount}

Your submission will be reviewed by the {companyName} team. You can view or edit your submission (before the deadline) at any time via the link below:
{editLink}

Submitted Files:
{fileList}

For assistance, please contact:
{contactEmail}

Thank you for your cooperation!

Best regards,
{companyName} Supply Chain Management Team`
    }
  },

  // 情境4：表單填寫到期提醒
  dueDateReminder: {
    userStory: "作為專案管理人員(PGM)，我想要在截止日期前提醒供應商完成表單，以確保按時收集所需資料。",
    zh: {
      subject: "【提醒】資料提交截止日期即將到期 - {requestTitle}",
      body: `親愛的{supplierName}供應商：

這是一則溫馨提醒，您被要求提交的{requestTitle}資料將於 {daysLeft} 天後截止。

表單詳情：
表單名稱：{requestTitle}
截止日期：{dueDate}
當前狀態：{currentStatus}
完成進度：{completionRate}%

請儘快完成資料提交。您可以通過以下連結繼續填寫表單：
{formLink}

如果您已經開始填寫但未完成，系統已保存您的進度。

如有任何疑問或需要延期，請立即聯繫：
{contactPerson}
{contactEmail}

感謝您的合作！

此致
{companyName}供應鏈管理團隊`
    },
    en: {
      subject: "[REMINDER] Data Submission Due Date Approaching - {requestTitle}",
      body: `Dear {supplierName},

This is a friendly reminder that the {requestTitle} submission you were requested to complete is due in {daysLeft} days.

Form Details:
Form Title: {requestTitle}
Due Date: {dueDate}
Current Status: {currentStatus}
Completion Rate: {completionRate}%

Please complete your submission as soon as possible. You can continue working on the form via the link below:
{formLink}

If you have already started but not completed the form, your progress has been saved.

If you have any questions or need an extension, please contact immediately:
{contactPerson}
{contactEmail}

Thank you for your cooperation!

Best regards,
{companyName} Supply Chain Management Team`
    }
  }
};

// 通知信息變數說明
export const templateVariables = {
  common: [
    { name: "supplierName", description: "供應商公司名稱" },
    { name: "companyName", description: "請求資料的公司名稱" },
    { name: "requestTitle", description: "資料請求的標題" },
    { name: "formLink", description: "表單填寫的連結" }
  ],
  supplierDataRequest: [
    { name: "dueDate", description: "截止日期" },
    { name: "priority", description: "重要程度" },
    { name: "description", description: "詳細說明" },
    { name: "contactPerson", description: "聯絡人姓名" },
    { name: "contactEmail", description: "聯絡人電子郵件" },
    { name: "requesterName", description: "請求者姓名" }
  ],
  pgmSubmissionNotification: [
    { name: "pgmName", description: "專案管理人員姓名" },
    { name: "supplierId", description: "供應商ID" },
    { name: "submissionTime", description: "提交時間" },
    { name: "fileCount", description: "提交的檔案數量" },
    { name: "viewLink", description: "查看提交資料的連結" },
    { name: "supplierNotes", description: "供應商備註" },
    { name: "reviewPeriod", description: "審核期限(天數)" }
  ],
  supplierSubmissionConfirmation: [
    { name: "supplierContactName", description: "供應商聯絡人姓名" },
    { name: "submissionTime", description: "提交時間" },
    { name: "fileCount", description: "提交的檔案數量" },
    { name: "editLink", description: "編輯提交內容的連結" },
    { name: "fileList", description: "提交的檔案清單" },
    { name: "contactEmail", description: "聯絡人電子郵件" }
  ],
  dueDateReminder: [
    { name: "daysLeft", description: "剩餘天數" },
    { name: "dueDate", description: "截止日期" },
    { name: "currentStatus", description: "目前填寫狀態" },
    { name: "completionRate", description: "完成百分比" },
    { name: "contactPerson", description: "聯絡人姓名" },
    { name: "contactEmail", description: "聯絡人電子郵件" }
  ]
}; 