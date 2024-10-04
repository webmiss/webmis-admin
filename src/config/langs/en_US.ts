/* English */
export function langs(): any {
  return {
    home: 'Home',
    action: 'Action',
    search: 'Search',
    add: 'Add',
    edit: 'Edit',
    del: 'Delete',
    remove: 'Remove',
    clear: 'Clear',
    export: 'Export',
    copy: 'Copy',
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
    title: 'Title',
    name: 'Name',
    info: 'Information',
    content: 'Content',
    size: 'Size',
    page: 'Page',
    null: 'Null',
    not: 'Not',
    logout: 'Log out',
    status: 'Status',
    enable: 'Enable',
    disable: 'Disable',
    ctime: 'Create Time',
    utime: 'Modify Time',
    network_err: 'Network error',
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
      return 'Folder: <b>'+(dirNum || 0)+'</b>&nbsp;&nbsp;File: <b>'+(fileNum || 0)+'</b>&nbsp;&nbsp;Size: <b>'+(size || 0)+'</b>&nbsp;&nbsp;';
    },
    sys_file_rootdir: 'RootDir',
    sys_file_back: 'Back Up',
    sys_file_select_file: 'Select File',
    sys_file_verify_name: 'Name 2-32 characters',
    sys_file_verify_name_exist: 'The name already exists',
    /* SysUser */
    sys_user_total: (num: number)=>{
      return 'There are a total of <b>'+(num || 0)+'</b> items';
    },
    sys_user_image: 'Image',
    sys_user_type: 'Type',
    sys_user_role: 'Role',
    sys_user_perm: 'Permissions',
    sys_user_uname: 'UserName',
    sys_user_passwd: 'Password',
    sys_user_base: 'Base Info',
    sys_user_nickname: 'Nickname',
    sys_user_department: 'Department',
    sys_user_position: 'Position',
    sys_user_name: 'Name',
    sys_user_gender: 'Gender',
    sys_user_birthday: 'Birthday',
    sys_user_uname_placeholder: 'Uname \\ PhoneNumber \\ Email',
    sys_user_passwd_placeholder: 'Default password',
    sys_user_verify_uname: 'Please enter Uname, PhoneNumber, OR Email',
    sys_user_verify_passwd: 'Password 6-16 characters',
    /* SysRole */
    sys_role_total: (num: number)=>{
      return 'There are a total of <b>'+(num || 0)+'</b> items';
    },
    sys_role_perm: 'Permissions',
    sys_role_verify_name: 'Role name 2-16 characters',
    /* SysMenus */
    sys_menus_total: (num: number)=>{
      return 'There are a total of <b>'+(num || 0)+'</b> items';
    },
    sys_menus_lang: 'Language',
    sys_menus_en_us: 'English',
    sys_menus_zh_cn: '简体中文',
    sys_menus_fid: 'Class',
    sys_menus_ico: 'Icon',
    sys_menus_title: 'Name',
    sys_menus_en: 'Pinyin',
    sys_menus_url: 'FrontUrl',
    sys_menus_controller: 'ApiUrl',
    sys_menus_sort: 'Sort',
    sys_menus_perm: 'Permission value',
    sys_menus_sort_placeholder: 'Sort, such as: 0, 1, 2',
    sys_menus_verify_title: 'The title must be 2-32 characters long',
    /* WebHtml */
    web_html_total: (num: number)=>{
      return 'There are a total of <b>'+(num || 0)+'</b> items';
    },
    web_html_type: 'Type',
    web_html_title: 'Title',
    web_html_name: 'Name',
    web_html_verify_title: 'The title must be 2-32 characters long',
    web_html_verify_name: 'The name must be 2-16 characters long',
  }
}