<?php
namespace HcBackend\Data\User;

use Zend\Filter\StringTrim;
use Zend\I18n\Translator\Translator;
use Zend\Validator\Uri;
use Zend\Http\PhpEnvironment\Request;
use Zf2Libs\Data\AbstractInputFilter;
use Zend\Validator\EmailAddress;
use Zend\Validator\StringLength;
use Zend\InputFilter\Input;

class Login extends AbstractInputFilter implements LoginDataInterface
{
    /**
     * @var Translator
     */
    protected $translate;

    public function __construct(Request $request, Translator $translator)
    {
        $input = new Input('identity');
        $input->setRequired(false);
        $input->getValidatorChain()
              ->attach(new EmailAddress());
        $input->getFilterChain()
              ->attach(new StringTrim());
        $this->add($input);

        $input = new Input('credential');
        $input->setRequired(false);
        $input->getValidatorChain()
              ->attach(new StringLength(array('min'=>6)));
        $input->getFilterChain()
              ->attach(new StringTrim());
        $this->add($input);

        $this->translate = $translator;

        $this->setData($request->getPost()->toArray());
    }


    /**
     * @return array
     */
    public function getMessages()
    {
        $invalidInputs = $this->getInvalidInput();

        $messages = array();
        if (array_key_exists('identity', $invalidInputs) ||
            array_key_exists('credential', $invalidInputs)) {
            $messages['identity'] = $this->translate->translate('Вы ввели не корректный логин или пароль');
        }

        return $messages;
    }

    /**
     * @return string
     */
    public function getIdentity()
    {
        return $this->getValue('identity');
    }

    /**
     * @return string
     */
    public function getCredential()
    {
        return $this->getValue('credential');
    }
}
