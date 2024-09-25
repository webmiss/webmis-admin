/* English */
export function langs(): any {
  return {
    home: 'Home',
    search: 'Search',
    add: 'Add',
    edit: 'Edit',
    del: 'Delete',
    remove: 'Remove',
    clear: 'Clear',
    export: 'Export',
    mkdir: 'New Folder',
    rename: 'Rename',
    upload: 'Upload',
    download: 'Download',
    prev: 'Prev',
    next: 'Next',
    confirm: 'Confirm',
    reset: 'Reset',
    remark: 'Remark',
    keyword: 'Search keywords',
    select: 'Please select',
    select_all: 'Select All',
    select_not: 'Not Select',
    placeholder: 'Please enter',
    folder: 'Folder',
    file: 'File',
    name: 'Name',
    size: 'Size',
    page: 'Page',
    null: 'Null',
    logout: 'Log out',
    status: 'Status',
    enable: 'Enable',
    disable: 'Disable',
    ctime: 'Create Time',
    utime: 'Modify Time',
    del_warn: (num: number)=>{ return 'Delete <b>'+num+'</b> pieces of data' },
    export_warn: (num: number)=>{ return 'Export <b>'+num+'</b> pieces of data' },
    /* Page */
    page_total: (total: number, page: number, num: number)=>{ return 'Total '+total+', Page '+page+' of '+num },
    page_limit: 'Limit',
    /* Login */
    login_uname: 'Uname / Phone / Email',
    login_passwd: 'Please input a password',
    login_vcode: 'Code',
    login_refresh: 'Click to refresh',
    /* Menus */
    menus_placeholder: 'Search menu',
    menus_recent: 'Recently visited',
    menus_recommend: 'Recommended tools',
    /* Uinfo */
    uinfo_title: 'User Information',
    uinfo_img: 'Change image',
    uinfo_type: 'Type',
    uinfo_nickname: 'Nickname',
    uinfo_nickname_placeholder: 'User nickname',
    uinfo_department: 'Department',
    uinfo_position: 'Position',
    uinfo_name: 'Name',
    uinfo_gender: 'Gender',
    uinfo_gender_boy: 'Boy',
    uinfo_gender_girl: 'Girl',
    uinfo_birthday: 'Birthday',
    uinfo_signature: 'Signature',
    /* Passwd */
    passwd_title: 'Change Password',
    passwd_code_placeholder: 'Verification code',
    passwd_code_get: 'Send code',
    passwd_code_resend: 'Resend code',
    passwd_code_time: (time: number)=>{ return 'Try again in '+time+' second' },
    passwd_new: 'New password',
    passwd_confirm: 'Confirm password',
    passwd_verify_null: 'Null account',
    passwd_verify_code: 'Please enter the verification code',
    passwd_verify_passwd1: 'Starting with an English letter, 6-16 characters',
    passwd_verify_passwd2: 'Two passwords are inconsistent',
    /* SysFile */
    sys_file_total: (dirNum: number, fileNum: number, size: number)=>{
      return 'Folder: <b>'+dirNum+'</b>&nbsp;&nbsp;File: <b>'+fileNum+'</b>&nbsp;&nbsp;Size: <b>'+size+'</b>&nbsp;&nbsp;';
    },
    sys_file_rootdir: 'RootDir',
    sys_file_back: 'Back Up',
    sys_file_select_file: 'Select File',
    sys_file_verify_name: 'Name 2-32 characters',
    sys_file_verify_name_exist: 'The name already exists',
    /* WebHtml */
    web_html_type: 'Type',
    web_html_title: 'Title',
    web_html_name: 'Name',
    web_html_tabs_info: 'Base Information',
    web_html_tabs_content: 'Content',
    web_html_verify_title: 'The title must be 2-32 characters long',
    web_html_verify_name: 'The name must be 2-16 characters long',
  }
}