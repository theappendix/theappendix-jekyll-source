module Jekyll
  class Person
    attr_reader :first_name
    attr_reader :last_name
    attr_reader :bio

    def initialize(id, site)
      @id = id

      people = site.collections['contributors'].docs.select do |p|
        p.data['id'].to_s == id.to_s
      end

      person = people.first

      @first_name = person.data['first_name']
      @last_name = person.data['last_name']
      @bio = person.content
    end

    def full_name
      if @first_name and @last_name
        return "#{@first_name} #{@last_name}"
      else
        return @first_name
      end
    end
  end

  module PersonFullNameFilter
    def person_full_name(input)
      person = Person.new(input.strip, @context.registers[:site])

      if person
        result = person.full_name
      else
        result = "ERROR: There is no person associated with the specified id ‘#{input.strip}’."
      end

      result
    end
  end

  module PersonBioFilter
    def person_bio(input)
      person = Person.new(input.strip, @context.registers[:site])

      if person
        result = person.bio
      else
        result = "ERROR: There is no person associated with the id ‘#{input.strip}’."
      end

      result
    end
  end
end

Liquid::Template.register_filter(Jekyll::PersonFullNameFilter)
Liquid::Template.register_filter(Jekyll::PersonBioFilter)